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
import styles from '@/pages/coupon/userCoupon.module.scss'
import Coupon from '@/components/coupon/coupon.js'
import Data from '@/data/Coupon.json'

// sidebar假資料
const sidebarData = [
  '會員資訊',
  '我的樂團',
  '我的訂單',
  '我的文章',
  '我的收藏',
  '我的優惠券',
  '我的課程',
  '我的訊息',
]
let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Test() {
  console.log(Data)
  return (
    <>
      <Navbar />
      <div
        className="hero d-none d-sm-block"
        style={{ paddingTop: '60px' }}
      ></div>
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
              <div className="d-flex justify-content-between">
                <div className="filter-sort d-flex justify-content-between">
                  {/* 麵包屑 */}
                  <div className="breadcrumb-wrapper">
                    <ul className="d-flex align-items-center p-0 m-0">
                      <IoHome size={20} />
                      <li style={{ marginLeft: '8px' }}>會員中心</li>
                      <FaChevronRight />
                      <li style={{ marginLeft: '10px' }}>我的優惠券</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className={styles['couponContentBG']}>
              <div>
                <h3 className={styles['couponTitle']}>我的優惠券</h3>
              </div>

              {/* 條件篩選 */}
              <div className="filter-sort d-flex justify-content-between p-3">
                {/* 麵包屑 */}
                <div className="d-none d-sm-block">
                  <nav aria-label="breadcrumb sort d-flex justify-content-between align-items-center">
                    <ol className="breadcrumb  breadcrumb-line">
                      <li className="h6 coupon-breadcrumb breadcrumb-item couponBTN">
                        <a href="#" className="active">
                          全部
                        </a>
                      </li>
                      <li
                        className="h6 coupon-breadcrumb coupon-breadcrumb-item breadcrumb-item"
                        aria-current="page"
                      >
                        <a
                          href="#"
                          className="coupon-breadcrumb coupon-breadcrumb-item"
                        >
                          樂器
                        </a>
                      </li>
                      <li
                        className="h6 coupon-breadcrumb coupon-breadcrumb-item breadcrumb-item"
                        aria-current="page"
                      >
                        <a
                          href="#"
                          className="coupon-breadcrumb coupon-breadcrumb-item"
                        >
                          課程
                        </a>
                      </li>
                    </ol>
                  </nav>
                </div>
                {/* RWD */}
                <div className="sort-mb d-block d-sm-none">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value>全部</option>
                    <option value={1}>樂器</option>
                    <option value={2}>課程</option>
                  </select>
                </div>
                {/* 資料排序 */}
                <div className="sort d-flex align-items-center coupon-screen">
                  <div className="d-none d-sm-block">
                    <FaFilter size={13} />
                    排序 ：
                  </div>
                  <div className="sort-item active">折扣幅度</div>
                  <div className="sort-item">即將到期</div>
                  <div className="sort-item">已使用</div>
                </div>
              </div>
              <div className={styles['couponImage']}>
                {arr.map((v, i) => {
                  return <Coupon key={i} className={`${styles.couponItem} `} />
                })}
              </div>
              {/* Pagination */}
              <div className="d-flex justify-content-center pages d-none d-sm-block">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <style jsx>{`
         {
          /* // 全站配色 colors
          $primary: #1581cc;
          $light-primary: #18a1ff;
          $deep-primary: #124365;
          $dark: #1d1d1d;
          $secondary: #5a5a5a;
          $body: #b9b9b9;
          $yellow: #faad14;
          $red: #ec3f3f; */
        }
        .breadcrumb-line {
          border-bottom: 1px solid #fff;
        }
        .couponBTN {
          border-radius: 10px 10px 0 0;
          background-color: #fff;
        }
        .coupon-breadcrumb {
          color: #5a5a5a;
          font-weight: 600;
          font-size: h6;
          padding-inline: 10px;
          gap: 8px;
          padding: 5px 10px;
          margin: 5px 0 0 0;
          .coupon-breadcrumb-item {
            padding-inline: 4px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              color: #1581cc;
            }
          }
          .active {
            color: #124365;
            cursor: default;
            &:hover {
              color: #124365;
            }
          }
        }
        /*------------- RWD  ----------- */
        @media screen and (max-width: 576px) {
          body {
            padding-inline: 20px;
          }

          .custom-container {
            overflow: hidden;

            .user-content {
              width: 390px;
              padding: 10px;
              overflow: hidden;
            }
          }
        }
        /*------------- RWD  ----------- */
      `}</style>
    </>
  )
}
