import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import AdminSideBar from './AdminSideBar'

export default async function layout({ children }: { children: React.ReactNode }) {


    const session = await auth()

    return (
        <div className='flex items-start'>
            <SessionProvider session={session}>
                <AdminSideBar className=' min-w-[45px] lg:min-w-[300px] border-r-2 h-screen sticky top-0 left-0' />
                <div id='hide-scrollbar' className=' flex-grow max-w-[calc(100%-45px)] md:w-full  '>
                    {children}
                </div>

            </SessionProvider>

        </div>
    )
}
