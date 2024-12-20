import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import { formatNumber, formatRelativeDate } from "@/lib/utils"
import { notFound } from "next/navigation"

export default async function OrderPage() {

    const user = await getUser()

    if (!user || !user.id) {
        return notFound()
    }
    // todo: in future do a order model.
    const orders = await db.order.findMany({ where: { email: user.email! },orderBy: {createdAt: 'desc'},take: 50 })


    return (
        <div>
            <Table>
                <TableCaption>A list of Orders.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className=" text-center">plan</TableHead>
                        <TableHead>Credit</TableHead>
                        <TableHead>CreatedAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        orders.map((order) => {

                            return (
                                <TableRow key={order.id} >
                                    <TableCell className="w-[100px] font-medium">{order.id}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.email}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(order.amount)}$</TableCell>
                                    <TableCell className=" text-center">{"KICH NEHI"}</TableCell>
                                    <TableCell className=" text-center">{formatNumber(order.credit)}</TableCell>
                                    <TableCell>{formatRelativeDate(order.createdAt)}</TableCell>

                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
