"use server"
import { db } from '@/lib/prisma';
import disposableDomains from 'disposable-email-domains';
import dns from 'dns';
import net from 'net';

export const emailVerify = async (email: string, userId: string) => {
    try {

        if (!email || !isValidSyntax(email)) {
            console.log('invalid email syntax')
        }


        const user = await db.user.findFirst({ where: { id: userId } })
        if (!user || !user.id) return { error: "unauthorized" }

        const isUserHaveCredit = await db.credit.findFirst({ where: { userId: user.id, credit: { gt: 0 } } })

        if (!isUserHaveCredit) {
            return { error: "you don't have enough credit" }
        }

        const domain = email.split('@')[1];
        const isDisposable = isDisposableEmail(domain);
        const mxRecords = await getMxRecords(domain);
        const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
        const riskLevel = getRiskLevel(isDisposable, smtpExists.result);


        const data = {
            userId: user.id,
            email,
            domain,
            reason: smtpExists.message,
            isExist: smtpExists.result,
            isValidSyntax: isValidSyntax(email),
            isValidDomain: mxRecords.length > 0 ? true : false,
            riskLevel,
            mxRecords,
            isDisposable,
        }

        const newUser = await db.credit.update({
            where: { userId: user.id },
            data: {
                credit: (isUserHaveCredit.credit - 1)
            }
        })
        const result = await db.verifyEmail.create({
            data
        })
        return { data: result, credit: newUser.credit }
    } catch (error) {
        throw error
    }
}


// Basic syntax check
function isValidSyntax(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if the email domain is disposable
function isDisposableEmail(domain: string): boolean {
    return disposableDomains.includes(domain);
}

// Retrieve MX records for a domain
async function getMxRecords(domain: string): Promise<dns.MxRecord[]> {
    try {
        return await dns.promises.resolveMx(domain);
    } catch (error) {
        console.error("Error fetching MX records:", error);
        return [];
    }
}

// Check if email exists using SMTP handshake
async function checkSmtpExistence(email: string, mxHost: string): Promise<{ result: boolean, message: string }> {
    return new Promise((resolve) => {
        const client = net.createConnection(25, mxHost);
        let result = false;
        let message = '';

        client.setTimeout(5000);  // Set a timeout to avoid hanging

        client.on('connect', () => {
            // SMTP handshake initiation
            client.write(`EHLO ${mxHost}\r\n`);
            client.write(`MAIL FROM:<test@${mxHost}>\r\n`);
            client.write(`RCPT TO:<${email}>\r\n`);
        });

        client.on('data', (data) => {
            const response = data.toString();
            console.log(response)

            switch (true) {
                case response.includes('550-5.1.1'):
                    result = false
                    message = "Email address does not exist";
                    break;
                case response.includes('550'):
                    result = false
                    message = "Requested action not taken: mailbox unavailable";
                    break;
                case response.includes('554'):
                    result = false
                    message = "Transaction failed: generic error";
                    break;
                case response.includes('5.7.1'):
                    result = false
                    message = "Message rejected due to policy reasons";
                    break;
                default:
                    result = false
                    message = "Unknown error occurred";
                    break;
                case response.includes('250'):
                    result = true; // Email exists
                    break;
            }

            client.end();
        });

        client.on('timeout', () => {
            console.error("SMTP request timed out");
            resolve({ result: false, message: "Request timed out" }); // Timeout likely means no reliable response
            client.end();
        });

        client.on('error', (error) => {
            console.error("SMTP Error:", error.message);
            resolve({ result: false, message: error.message }); // Network or connection error; treat as non-existent
            client.end();
        });

        client.on('end', () => {
            resolve({ result, message }); // Resolve based on the last `result` value
        });
    });
}

// Assess risk level based on checks
function getRiskLevel(disposable: boolean, smtpExists: boolean): string {
    if (!smtpExists) return "high";
    if (disposable) return "medium";
    return "low";
}