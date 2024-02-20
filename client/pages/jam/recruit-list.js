import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="hero d-none d-sm-block" style={{ paddingTop: '60px' }}>
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div>
      <div className="container">
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                <li className="active">團員募集</li>
                <li>
                  <Link href={'/jam/jam-list'}>活動中的JAM</Link>
                </li>
                <li>
                  <Link href={'/jam/Q&A'}>什麼是JAM？</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 頁面內容 */}
          <main
            className="main col-12 col-sm-10"
            style={{
              backgroundColor: 'rgb(195, 195, 195)',
              paddingLeft: '30px',
            }}
          >
            {/* 頂部功能列 */}
            <div></div>
          </main>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .main {
          min-height: 100svh;
        }
      `}</style>
    </>
  )
}
