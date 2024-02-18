import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="container"></div>
      <Footer />

      <style jsx>{`
        .container {
          min-height: calc(100svh);
        }
      `}</style>
    </>
  )
}
