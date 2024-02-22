import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
// coupon
import CouponWhite from '@/components/coupon/couponWhite'
import CouponBlue from '@/components/coupon/couponBlue'

// sidebar假資料
const sidebarData = [
  '帕魯',
  'PalWorld樂團',
  '會員資訊',
  '我的樂團',
  '我的訂單',
  '我的文章',
  '我的收藏',
  '我的優惠券',
  '我的課程',
  '我的訊息',
]
let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>我的優惠券</li>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                <div className="filter-sort d-flex justify-content-between">
                  {/* 資料排序 */}
                  <div className="sort d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <FaSortAmountDown size={13} />
                    </div>
                    <div className="sort-item active">全部</div>
                    <div className="sort-item">樂器</div>
                    <div className="sort-item">課程</div>
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
                    <div className="sort-item active">折扣幅度</div>
                    <div className="sort-item">即將到期</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className="content">
              {arr.map((i) => {
                return <CouponBlue key={i} />
              })}
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <style jsx>{``}</style>
    </>
  )
}
