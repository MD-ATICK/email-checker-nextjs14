

import { auth } from '@/auth'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {


  const session = await auth()

  return (
    <div>
      <SessionProvider session={session}>
        <Navbar />
        {children}
        <Footer />
      </SessionProvider>
    </div>
  )
}
