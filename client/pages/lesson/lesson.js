import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Card from '@/components/instrument/card'
import Link from 'next/link'
import Image from 'next/image'
import lessonHero from '@/assets/lesson-hero.jpg'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'

// sidebar假資料
const sidebarData = [
  '歌唱技巧',
  '樂器演奏',
  '音樂倫理',
  '詞曲創作',
  '軟體操作',
  '活動專區',
]

let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="hero d-none d-sm-block" style={{ paddingTop: '60px' }}>
        <Image
          src={lessonHero}
          className="object-fit-cover w-100"
          alt="cover"
        />
      </div>
      <div className="container">
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block  col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                {sidebarData.map((item, index) => {
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
          <main
            className="col-12 col-sm-10 pe-0"
            style={{
              paddingLeft: '30px',
            }}
          >
            {/* 頂部功能列 */}
            <div className="top-function-container">
              {/* 麵包屑 */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>探索課程</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>線上課程</li>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                {/* 搜尋欄 */}
                <div className="search input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="請輸入關鍵字..."
                  />
                  <div className="search-btn btn d-flex justify-content-center align-items-center p-0">
                    <IoIosSearch size={25} />
                  </div>
                </div>
                <div className="filter-sort d-flex justify-content-between">
                  {/* 條件篩選 */}
                  <div className="filter d-flex align-items-center">
                    條件篩選
                    <FaFilter size={13} />
                  </div>
                  {/* 資料排序 */}
                  <div className="sort d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={13} />
                    </div>
                    <div className="sort-item active">最熱門</div>
                    <div className="sort-item">依評價</div>
                    <div className="sort-item">依實數</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className="content">
              <div className="row row-cols-1 row-cols-md-4">
                {arr.map((i, index) => {
                  return (
                    <div key={index} className="col mb-4">
                      <Card />
                    </div>
                  )
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <style jsx>{``}</style>
    </>
  )
}
