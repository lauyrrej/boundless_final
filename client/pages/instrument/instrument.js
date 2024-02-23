import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Card from '@/components/instrument/card'
import Link from 'next/link'
import Image from 'next/image'
import productlistHero from '@/assets/product-list-hero.jpg'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'

// sidebar假資料
const sidebarData = [
  { id: 1, parent_id: null, name: '吉他' },
  { id: 2, parent_id: null, name: '貝斯' },
  { id: 3, parent_id: null, name: '鍵盤樂器' },
  { id: 4, parent_id: 1, name: '電吉他' },
  { id: 5, parent_id: 1, name: '木吉他' },
]

let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="hero d-none d-sm-block" style={{ paddingTop: '60px' }}>
        <Image
          src={productlistHero}
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
                <li>
                  <Link href={'/instrument/all'}>全部</Link>
                </li>
                {sidebarData.map((item, index) => {
                  if (!item.parent_id) {
                    return (
                      <li
                        key={index}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <div>{item.name}</div>
                        <FaChevronRight size={16} />
                      </li>
                    )
                  }
                })}

                {/* <div>
            {recipes.map((recipe) => {
                return <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image} alt="recipe image" />
                    {recipe.dishTypes.map((type, index) => {
                        return <span key={index}>{type}</span>
                    })}
                </div>
            })}
        </div> */}

                <li>
                  <Link href={'/instrument/event'}>活動促銷</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 頁面內容 */}
          <main
            className="col-12 col-sm-10 pe-0"
            style={{
              paddingLeft: '15px',
              paddingRight: '15px',
            }}
          >
            {/* 頂部功能列 */}
            <div className="top-function-container">
              {/* 麵包屑 */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>樂器商域</li>
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
                    <div className="sort-item active">最熱銷</div>
                    <div className="sort-item">最高價</div>
                    <div className="sort-item">最低價</div>
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

      <style jsx>{`
        @media screen and (max-width: 576px) {
          .sidebar-wrapper {
            display: none; // 在小型螢幕上隱藏側邊欄
          }

          .hero {
            padding-top: '40px'; // 調整小型螢幕的英雄區塊上方填充
          }

          .breadcrumb-wrapper {
            margin-left: '8px'; // 調整小型螢幕的麵包屑左邊距
          }

          .sort-item {
            display: none; // 在小型螢幕上隱藏排序項目
          }
        }

        @media screen and (min-width: 576px) {
          .sidebar-wrapper {
            display: block; // 在中型螢幕上顯示側邊欄
            width: 200px; // 調整中型螢幕上的側邊欄寬度
          }

          .col-sm-10 {
            padding-left: 30px; // 在中型螢幕上恢復左填充
          }

          .hero {
            padding-top: '60px'; // 調整中型螢幕的英雄區塊上方填充
          }

          .breadcrumb-wrapper {
            margin-left: '12px'; // 調整中型螢幕的麵包屑左邊距
          }

          .sort-item {
            display: block; // 在中型螢幕上顯示排序項目
          }
        }
      `}</style>
    </>
  )
}
