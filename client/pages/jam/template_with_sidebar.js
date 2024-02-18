import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'

// sidebar假資料
const sidebarData = ['吉他', '貝斯', '鍵盤樂器', '打擊樂器']

export default function Test() {
  const [sidebarContent, setSidebarContent] = useState(sidebarData)
  return (
    <>
      <Navbar />
      <div className="hero d-none d-sm-block">
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div>
      <div className="container">
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper col-sm-2 overflow-y-auto">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                {sidebarContent.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {/* 頁面內容 */}
          <div
            className="main-content col-sm-10"
            style={{ backgroundColor: 'rgb(195, 195, 195)' }}
          >
            主要內容
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .container {
          min-height: calc(100svh);
        }
      `}</style>
    </>
  )
}
