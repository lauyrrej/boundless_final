import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import InstrumentCard from '@/components/instrument/card'

// sidebar假資料
const sidebarData = ['吉他', '貝斯', '鍵盤樂器', '打擊樂器']

export default function Test() {
  const [sidebarContent, setSidebarContent] = useState(sidebarData)
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div
            className="sidebar col-sm-2"
            style={{ backgroundColor: 'rgb(255, 156, 156)' }}
          >
            <ul>
              {sidebarContent.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ul>
          </div>

          <div
            className="main-content col-sm-10"
            style={{ backgroundColor: 'rgb(195, 195, 195)' }}
          >
            <InstrumentCard />
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
