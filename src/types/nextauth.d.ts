import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession['user'] & {
    role: "ADMIN" | "USER",
    isOAuth: boolean,
    subscriptionId: string,
    customerId: string,
    emailVerified: Date | null
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser
    }
}