import Footer from '@/components/Footer'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {



  return (
    <div>
      {/* <Navbar /> */}
      {children}
      <Footer />
    </div>
  )
}
