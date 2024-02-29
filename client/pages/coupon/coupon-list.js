import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import avatar from '@/public/user/Meiyuyu.jpg'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

// coupon
import styles from '@/pages/coupon/userCoupon.module.scss'
import Coupon from '@/components/coupon/coupon.js'
import Data from '@/data/Coupon.json'

export default function Test() {
  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  // sidebar
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebarToggle = () => {
    setShowSidebar(!showSidebar)
  }
  // ----------------------假資料  ----------------------
  // sidebar假資料
  const sidebarData = [
    '會員資訊',
    '我的樂團',
    '我的訂單',
    '我的文章',
    '我的收藏',
    '我的優惠券 ',
    '我的課程',
    '我的訊息',
  ]
  let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  // 資料排序
  const [dataSort, setDataSort] = useState('latest')
  // ----------------------條件篩選  ----------------------
  const [filterVisible, setFilterVisible] = useState(false)
  useEffect(() => {
    document.addEventListener('click', (e) => {
      setFilterVisible(false)
    })
  }, [])
  // 阻止事件冒泡造成篩選表單關閉
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }
  // filter假資料
  const brandData = [
    { id: 1, name: 'YAMAHA' },
    { id: 2, name: 'Roland' },
    { id: 3, name: 'Fender' },
    { id: 4, name: 'Gibson' },
  ]
  const [brandSelect, setBrandSelect] = useState('all')

  const [priceLow, setPriceLow] = useState('')
  const [priceHigh, setPriceHigh] = useState('')

  // 課程評價
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')

  // 活動促銷
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setBrandSelect('all')
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
  }

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HEROSECTION隱藏 */}
      {/* <div
        className="page-shero d-none d-sm-block"
        style={{ paddingTop: '60px' }}
      >
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div> */}
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          {/* 用戶資訊 */}
          <div className="menu-mb-user-info d-flex align-items-center flex-column mb-3">
            <div className="mb-photo-wrapper mb-2">
              <Image
                src="/jam/amazingshow.jpg"
                alt="user photo mb"
                fill
              ></Image>
            </div>
            <div>用戶名稱</div>
          </div>
          <Link
            className="mm-item"
            href="/user"
            style={{ borderTop: '1px solid #b9b9b9' }}
          >
            會員中心
          </Link>
          <Link className="mm-item" href="/lesson/lesson-list">
            探索課程
          </Link>
          <Link className="mm-item" href="/instrument/instrument-list">
            樂器商城
          </Link>
          <Link className="mm-item" href="/jam/recruit-list">
            Let &apos;s JAM!
          </Link>
          <Link className="mm-item" href="/article/article-list">
            樂友論壇
          </Link>
          <div className="mm-item" style={{ color: '#1581cc' }}>
            登出
            <ImExit size={20} className="ms-2" />
          </div>
        </div>
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <div className="sidebar-user-info">
                <div className="sidebar-user-info-imgBox">
                  <Image
                    style={{ width: 100, height: 100, resizeMode: 'cover' }}
                    src={avatar}
                    alt="user photo mb"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">棉悠悠</div>
                  <div className="sidebar-user-info-band">幻獸帕魯</div>
                </div>
                {/* 更換大頭貼的功能暫定併回會員資訊 故不再sidebar顯示 */}
                {/* <div className="sidebar-user-info-Camera-img">
                  <Image src={avatar} alt="user photo mb" fill></Image>
                </div> */}
              </div>
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

          {/*   ----------------------頁面內容  ---------------------- */}
          <div className="col-12 col-sm-10 page-control">
            {/* 手機版sidebar */}
            <div
              className={`sidebar-mb d-sm-none ${
                showSidebar ? 'sidebar-mb-show' : ''
              }`}
            >
              <div className="sm-close">
                <IoClose
                  size={32}
                  onClick={() => {
                    setShowSidebar(false)
                  }}
                />
              </div>
              <Link href={``} className="sm-item">
                會員資訊
              </Link>
              <Link href={``} className="sm-item">
                我的樂團
              </Link>
              <Link href={``} className="sm-item">
                我的訂單
              </Link>
              <Link href={``} className="sm-item">
                我的文章
              </Link>
              <Link href={``} className="sm-item">
                我的收藏
              </Link>
              <Link href={``} className="sm-item active">
                我的優惠券
              </Link>
              <Link href={``} className="sm-item">
                我的課程
              </Link>
              <Link href={``} className="sm-item">
                我的訊息
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>我的優惠券</li>
                </ul>
              </div>
              {/* 篩選列 */}
              <div className="top-function-flex">
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none align-items-center b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                  {/*搜尋欄*/}
                  {/* <div className="search input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入關鍵字..."
                    />
                    <div className="search-btn btn d-flex justify-content-center align-items-center p-0">
                      <IoIosSearch size={25} />
                    </div>
                  </div> */}
                  {/* 類型分類 */}
                  <div className="d-none d-sm-block">
                    <nav aria-label="breadcrumb sort d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb  breadcrumb-line">
                        <li className="h5 coupon-breadcrumb breadcrumb-item couponBTN">
                          <a href="#" className="active">
                            全部
                          </a>
                        </li>
                        <li
                          className="h5 coupon-breadcrumb coupon-breadcrumb-item breadcrumb-item"
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
                          className="h5 coupon-breadcrumb coupon-breadcrumb-item breadcrumb-item"
                          aria-current="page"
                        >
                          <a
                            href="#"
                            className="coupon-breadcrumb coupon-breadcrumb-item"
                          >
                            課程
                          </a>
                        </li>
                        <li
                          className="h5 coupon-breadcrumb coupon-breadcrumb-item breadcrumb-item"
                          aria-current="page"
                        >
                          <a
                            href="#"
                            className="coupon-breadcrumb coupon-breadcrumb-item"
                          >
                            已使用
                          </a>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>

                <div className="filter-sort d-flex justify-content-between">
                  <div className="sort-mb d-block d-sm-none">
                    <select
                      className="form-select"
                      value={dataSort}
                      name="dataSort"
                      onChange={(e) => {
                        setDataSort(e.target.value)
                      }}
                    >
                      <option selected value="latest">
                        全部
                      </option>
                      <option value="oldest">樂器</option>
                      <option value="oldest">課程</option>
                      <option value="oldest">已使用</option>
                    </select>
                  </div>
                  {/*條件篩選*/}
                  <form className="d-flex align-items-center position-relative">
                    <div
                      className="filter-text d-flex align-items-center me-sm-4"
                      role="presentation"
                      onClick={onshow}
                    >
                      條件篩選
                      <FaFilter size={13} />
                      <div
                        className={`filter ${
                          filterVisible === false ? 'd-none' : 'd-block'
                        }`}
                        onClick={stopPropagation}
                        role="presentation"
                      >
                        {/*條件篩選*/}
                        <div className="filter-item">
                          <div className="filter-title">折扣幅度</div>
                          <div className="filter-title">選擇品牌</div>
                        </div>
                        {/* 品牌 */}
                        <div className="filter-item">
                          <div className="filter-title">選擇品牌</div>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={brandSelect}
                            name="brand"
                            onChange={(e) => {
                              setBrandSelect(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              全部
                            </option>
                            {brandData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* 區間~促銷Delete */}
                        <div
                          className="d-flex justify-content-between gap-2 mt-2"
                          style={{ paddingInline: '10px' }}
                        >
                          <div
                            className="filter-btn clean-btn w-100 d-flex justify-content-center"
                            role="presentation"
                            onClick={cleanFilter}
                          >
                            清除
                          </div>
                          <div className="filter-btn confirm-btn w-100 d-flex justify-content-center">
                            確認
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* ---------------------- 資料排序  ---------------------- */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>
                    <div
                      className={`sort-item ${
                        dataSort === 'latest' ? 'active' : ''
                      }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('latest')
                      }}
                    >
                      折扣幅度
                    </div>
                    <div
                      className={`sort-item ${
                        dataSort === 'oldest' ? 'active' : ''
                      }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('oldest')
                      }}
                    >
                      即將到期
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              <div className="container custom-container">
                <div className="row">
                  <div
                    className="col-sm-10 col-12"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                  >
                    <div className="user-content col-12">
                      <div className="user-content-top">
                        <div className="user-title-userInfo">我的優惠券</div>
                      </div>
                      {/* components */}
                      <div className={styles['couponImage']}>
                        {arr.map((v, i) => {
                          return (
                            <Coupon
                              key={i}
                              className={`${styles.couponItem} `}
                            />
                          )
                        })}
                      </div>

                      {/*pagination*/}
                      <div className="coupon-pagination">
                        <div className="d-flex justify-content-center pages d-none d-sm-block">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li className="page-item">
                                <a
                                  className="page-link"
                                  href="#"
                                  aria-label="Previous"
                                >
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
                                <a
                                  className="page-link"
                                  href="#"
                                  aria-label="Next"
                                >
                                  <span aria-hidden="true">»</span>
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        /* -------------------user sidebar-------------------- */
        .sidebar-user-info {
          display: flex;
          padding: 0px 12px;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;
          /* position: relative; */
          .sidebar-user-info-imgBox {
            width: 100px;
            height: 100px;
            border-radius: 100px;
            background: url(<path-to-image>),
              lightgray -26.448px -3.114px / 132.653% 100% no-repeat;
          }
          .sidebar-user-info-text {
            display: flex;
            width: 100px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: center;

            /* h5 */
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            .sidebar-user-info-band {
              margin-bottom: 20px;
            }
          }
          .sidebar-user-info-Camera-img {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 85px;
            top: 70px;
            fill: var(--light-gray, #cfcfcf);
          }
        }
        /* -------------------user sidebar-------------------- */
        /* --------------- user-contect-acticle--------------- */

        .custom-container {
          padding: 0;
          color: #000;

          & p {
            font-family: 'Noto Sans TC';
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #000;
            text-overflow: ellipsis;
          }
          & h5 {
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: var(--primary-deep, #124365);
          }

          .coupon-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        .user-content {
          display: flex;
          width: 1070px;
          padding: 20px 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          border-radius: 5px;
          background: var(--gray-30, rgba(185, 185, 185, 0.3));

          .user-content-top {
            display: flex;
            align-items: flex-start;
            align-self: stretch;
            color: var(--primary-deep, #124365);
            text-align: center;
            justify-content: space-between;
            /* h3 */
            font-family: 'Noto Sans TC';
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            .user-acticle-newBtn {
              display: none;
            }
          }
          /*----------------------acticle css----------------------- */
          .user-acticleList {
            width: 100%;
          }

          .user-acticleList-item {
            align-items: center;
            padding-left: 25px;
            margin-inline: auto;
            /*height: 60px; */

            .user-acticleList-item-acticleCheck {
            }
            .user-acticleList-item-acticleLabel {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .user-acticleList-item-btnGroup {
              /* width: 200px; */
              gap: 10px;
              align-items: center;
              justify-content: end;

              .user-acticleList-item-text {
                color: var(--primary-deep, #124365);
                font-weight: bold;
                font-size: 20px;
              }
              .user-acticleList-item-btn {
                align-items: self-end;
              }
            }
          }

          .user-acticleList-item-title {
            align-items: center;
            margin-inline: auto;
            padding-left: 25px;
            .user-acticleList-item-title-acticleCheck {
            }
            .user-acticleList-item-title-acticleLabel {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .user-acticleList-item-title-btnGroup {
              /* width: 200px; */
              gap: 10px;
              justify-content: end;

              .user-acticleList-item-title-text {
                color: var(--primary-deep, #124365);
                font-weight: bold;
              }
              .user-acticleList-item-title-btn {
                align-items: self-end;
              }
            }
          }

           {
            /*coupon*/
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

          /*----------------------acticle css----------------------- */
          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /* RWD未生效 */

        /* RWD讓SIDEBAR消失 測試用記得刪 */
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

              .user-acticle-newBtn {
                display: flex;
                margin-right: 25px;
              }
            }
          }

          .user-content {
            .user-acticleList-item-title {
              padding-left: 15px;
              .user-acticleList-item-title-acticleCheck {
              }
              .user-acticleList-item-title-acticleLabel {
                -webkit-line-clamp: 2;
              }

              .user-acticleList-item-title-btnGroup {
                justify-content: flex-end;
                font-size: 12px;

                .user-acticleList-item-title-newBtn {
                  display: none;
                }
                .user-acticleList-item-title-text {
                  text-align: right;
                  font-size: 12px;
                  padding: 3px;
                }

                .user-acticleList-item-title-btn {
                  font-size: 12px;
                  padding: 3px;
                }
              }
            }

            .user-acticleList-item {
              padding-left: 15px;
              .user-acticleList-item-acticleCheck {
                margin-top: 15px;
              }
              .user-acticleList-item-acticleLabel {
                -webkit-line-clamp: 2;
              }

              .user-acticleList-item-btnGroup {
                justify-content: flex-end;
                font-size: 12px;

                .user-acticleList-item-text {
                  text-align: right;
                  font-size: 20px;
                  padding: 3px;
                }

                .user-acticleList-item-btn {
                  font-size: 12px;
                  padding: 3px;
                }
              }
            }
          }
        }
        /* RWD讓SIDEBAR消失 測試用記得刪 */
      `}</style>
    </>
  )
}
