"use client"

import { getSubCredit } from "@/actions/users"
import Loading from "@/app/loading"
import rocket from '@/assets/flash.png'
import { formatNumber } from "@/lib/utils"
import { useCreditStore } from "@/store/useCreditStore"
import Image from "next/image"
import { useEffect, useState } from "react"

interface props {
    userId: string,
    dashboard?: boolean
}
export default function CreditBox({ userId, dashboard }: props) {

    const { credit, setCredit } = useCreditStore()
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getCredit = async () => {
            setIsPending(true)
            const credit = await getSubCredit(userId)
            setIsPending(false)
            setCredit(credit || 0)
        }
        getCredit()
    }, [userId, setCredit]);

    return (
        <>
            {
                !dashboard && (
                    <div>
                        <div className='text-sm text-muted-foreground flex items-center gap-2'>
                            <Image alt="" src={rocket} height={18} className="invert" />
                            {isPending ? (
                                <span> <Loading /></span>
                            ) : (
                                <span className='text-lg sm:text-xl font-bold text-primary'>
                                    {credit !== undefined ? formatNumber(credit) : 'Loading...'}
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
            {
                dashboard &&
                <div className='flex items-center justify-between w-full'>
                    <div className=' text-xs'>Total Credit :  </div>
                    <div className='text-xs'>
                        {credit !== undefined ? credit : 'Loading...'}
                    </div>
                </div>
            }
        </>
    )
}
