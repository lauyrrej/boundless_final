// #region ---common ---
import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import Head from 'next/head'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

// lessoncard
import Card from '@/components/lesson/lesson-card'
import Cardrwd from '@/components/lesson/lesson-card-rwd'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
// #endregion common ---
// ---coupon ---
import styles from '@/pages/coupon/coupon.module.scss'
import Coupon from '@/components/coupon/coupon.js'
// API
import CouponClass from '@/API/Coupon'

export default function Test() {
  // #region ---會員登入狀態 & 會員資料獲取 ---
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [userData, setUserData] = useState()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  //登出功能

  //檢查是否獲取資料
  // console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }
  // #endregion
  // #region ---會員登入狀態 ---
  // 在電腦版或手機版時
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  // #endregion
  // #region ---手機版本 ---
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
  // const sidebarData = [
  //   '會員資訊',
  //   '我的樂團',
  //   '我的訂單',
  //   '我的文章',
  //   '我的收藏',
  //   '我的優惠券 ',
  //   '我的課程',
  //   '我的訊息',
  // ]
  // #endregion

  // 資料排序
  const [dataSort, setDataSort] = useState([])
  // #region ---條件篩選 ---
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
  // 篩選金額範圍
  // const [priceLow, setPriceLow] = useState('')
  // const [priceHigh, setPriceHigh] = useState('')
  // 課程評價
  // const scoreState = ['all', '5', '4', '3']
  // const [score, setScore] = useState('all')

  // 活動促銷
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setBrandSelect('all')
    // setPriceLow('')
    // setPriceHigh('')
    // setScore('all')
    setSales(false)
  }
  // #endregion
  // sql???? --- 分類 0:全部 / 1:樂器 / 2:課程 / 3:已使用 ---
  const [kind, setKind] = useState(0)
  const [valid, setValid] = useState(1)
  // sql???? --- 折扣幅度↓ / 即將到期↑ ---
  // const [discount, setDiscount] = useState('ASC')
  // const [limit_time, setLimit_time] = useState('DESC')

  // 從後端加載商品數據
  useEffect(() => {
    // component did mounted 呼叫api，這樣只會做一遍
    CouponClass.FindAll().then(async (res) => {
      setDataSort(res)
    })
  }, [])

  return (
    <>
      <Head menuMbToggle={menuMbToggle}>{/* <title>我的優惠券</title> */}</Head>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HeroSection隱藏 */}
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
                src={avatarImage}
                alt="user photo mb"
                fill
                sizes="(max-width: 150px)"
              ></Image>
            </div>
            <div>{LoginUserData.nickname}</div>
          </div>
          <Link
            className="mm-item"
            href="/user/user-info"
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
          {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
          <div
            onClick={handleLogout}
            //onclick 要加這個 不然ES會跳沒有給身障人士使用
            role="presentation"
            className="mm-item"
            style={{ color: '#1581cc' }}
          >
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
                    src={avatarImage}
                    alt="user photo mb"
                    fill
                    priority="default" //不加的話Next 會問是否要加優先級
                    sizes="(max-width: 150px)"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">
                    {LoginUserData.nickname}
                  </div>
                  <div className="sidebar-user-info-band">樂團名稱</div>
                </div>
                {/* 更換大頭貼的功能暫定併回會員資訊 故不再sidebar顯示 */}
                {/* <div className="sidebar-user-info-Camera-img">
                  <Image src={avatar} alt="user photo mb" fill></Image>
                </div> */}
              </div>
              <ul className="d-flex flex-column">
                {/* {sidebarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  )
                })} */}

                <li key={1}>
                  <Link href="/user/user-info">會員資訊</Link>
                </li>
                <li key={2}>
                  <Link href="/user/user-jam">我的樂團</Link>
                </li>
                <li key={3}>
                  <Link href="/user/user-order">我的訂單</Link>
                </li>
                <li key={4}>
                  <Link href="/user/user-acticle">我的文章</Link>
                </li>
                <li key={5}>
                  <Link href="/user/user-favorite">我的收藏</Link>
                </li>
                <li key={6}>
                  <Link href="/coupon/user-Coupon">我的優惠券</Link>
                </li>
                <li key={7}>
                  <Link href="/user/user-lesson">我的課程</Link>
                </li>
                <li key={8}>
                  <Link href="/user/user-notify">我的訊息</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ---頁面內容???? --- */}
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
              <Link href="#" className="sm-item active">
                會員資訊
              </Link>
              <Link href="#" className="sm-item">
                我的樂團
              </Link>
              <Link href="#" className="sm-item">
                我的訂單
              </Link>
              <Link href="#" className="sm-item">
                我的文章
              </Link>
              <Link href="#" className="sm-item">
                我的收藏
              </Link>
              <Link href="#" className="sm-item">
                我的優惠券
              </Link>
              <Link href="#" className="sm-item">
                我的課程
              </Link>
              <Link href="#" className="sm-item">
                我的訊息
              </Link>
            </div>
            {/* --- 頂部功能列 --- */}
            <div className="top-function-container">
              {/* --- 麵包屑 --- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>我的優惠券</li>
                </ul>
              </div>

              <div className="top-function-flex">
                {/* --- 搜尋欄 --- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none align-items-center b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                  {/* search */}
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

                  {/* 分類 */}
                  <div className="d-none d-sm-block pt-4">
                    <nav aria-label="breadcrumb sort d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb">
                        <li className="sort breadcrumb-item btn">
                          <a href="#" onClick={() => setKind(0)}>
                            全部
                          </a>
                        </li>
                        <li
                          className="sort breadcrumb-item btn"
                          aria-current="page"
                        >
                          <a href="#" onClick={() => setKind(2)}>
                            樂器
                          </a>
                        </li>
                        <li
                          className="sort breadcrumb-item btn"
                          aria-current="page"
                        >
                          <a href="#" onClick={() => setKind(1)}>
                            課程
                          </a>
                        </li>
                        <li
                          className="sort breadcrumb-item btn"
                          aria-current="page"
                        >
                          <a
                            href="#"
                            // 已過期valid=0????
                            onClick={() => setValid(0)}
                          >
                            已使用
                          </a>
                        </li>
                        {/* ???? */}
                        {/* <li className="sort breadcrumb-item submit btn">
                          領取Test
                        </li> */}
                      </ol>
                    </nav>
                  </div>
                </div>
                {/* 條件排序+RWD分類&條件排序 */}
                {/* RWD???? */}
                <div className="filter-sort d-flex justify-content-between">
                  <div className="sort-mb d-block d-sm-none">
                    <select
                      className="form-select"
                      //????
                      // value={order}
                      name="order"
                      //????
                      // onChange={(e) => {
                      //   handleOrder(e.target.value)
                      // }}
                    >
                      <option selected value="#">
                        全部
                      </option>
                      <option value="ASC">樂器</option>
                      <option value="ASC">課程</option>
                      <option value="ASC">已使用</option>
                      <option value="ASC">折扣幅度</option>
                      <option value="DESC">即將到期</option>
                    </select>
                  </div>
                  {/*篩選*/}
                  <form className="d-flex align-items-center position-relative">
                    <div
                      className="filter-text d-flex align-items-center me-sm-4 d-block d-sm-none"
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
                        {/* 價格區間 */}
                        {/* <div className="filter-item">
                          <div className="filter-title">價格區間</div>
                          <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="最低價"
                            name="priceLow"
                            value={priceLow}
                            min={0}
                            max={priceHigh - 1}
                            onChange={(e) => {
                              setPriceLow(e.target.value)
                            }}
                          />
                          <input
                            type="number"
                            className="form-control"
                            placeholder="最高價"
                            name="priceHigh"
                            value={priceHigh}
                            min={priceLow + 1}
                            onChange={(e) => {
                              setPriceHigh(e.target.value)
                            }}
                          />
                        </div> */}
                        {/* 商品評價 */}
                        {/* <div className="filter-item m-0">
                          <div className="filter-title">商品評價</div>
                          <div className="filter-radio-group d-flex flex-wrap justify-content-between">
                            {scoreState.map((v, i) => {
                              return (
                                <div
                                  className="filter-radio-item form-check p-0 mb-3"
                                  key={i}
                                >
                                  <label className="form-check-label">
                                    <input
                                      classname="form-check-input"
                                      type="radio"
                                      name="score"
                                      value={v}
                                      checked={v === score}
                                      onChange={(e) => {
                                        setScore(e.target.value)
                                      }}
                                    />
                                    &nbsp;{v === 'all' ? '全部' : v + '星'}
                                  </label>
                                </div>
                              )
                            })}
                          </div>
                        </div> */}
                        {/* 促銷商品 */}
                        <div className="filter-item">
                          <div className="form-check">
                            <label className="form-check-label filter-title mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={sales}
                                name="sales"
                                onChange={() => {
                                  setSales(!sales)
                                }}
                              />{' '}
                              促銷商品
                            </label>
                          </div>
                        </div>
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

                  {/* ----- 資料排序 ------ */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>
                    <div
                      // className={`sort-item ${order === 'ASC' ? 'active' : ''}`}
                      role="presentation"
                      // onClick={(e) => {
                      //   handleOrder('ASC')
                      // }}
                    >
                      即將到期
                    </div>
                    <div
                      //discount
                      // className={`sort-item ${
                      //     order === 'DESC' ? 'active' : ''
                      //   }`}
                      role="presentation"
                      // onClick={(e) => {
                      //   handleOrder('DESC')
                      // }}
                    >
                      折扣幅度
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
                    <div className="coupon-content col-12">
                      <div className="coupon-content-top">
                        <div className="user-title-userInfo">我的優惠券</div>
                      </div>
                      {/* components */}
                      <div className="couponImage">
                        {/* 如果 kind 不等於 0，則只保留具有與 kind 變數相等的 kind 屬性的元素；如果 kind 等於 0，則保留所有元素。最終返回符合條件的元素組成的新陣列。 */}
                        {dataSort
                          .filter((i) => (kind !== 0 ? i.kind === kind : true))
                          .filter((i) =>
                            valid !== 1 ? i.valid === valid : true
                          )
                          .map((v, i) => {
                            const {
                              id,
                              name,
                              type,
                              discount,
                              kind,
                              limit_time,
                            } = v
                            return (
                              <Coupon
                                key={id}
                                name={name}
                                type={type}
                                discount={discount}
                                kind={kind}
                                limit_time={limit_time}
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
        /* ---user sidebar--- */
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
            /* react Image 要加上這兩條參數 家在外層容器的css , Image本身要fill */
            position: relative;
            overflow: hidden;
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
        /* --- contect--- */
        .custom-container {
          padding: 0;
          color: #000;
          .coupon-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }
        .coupon-content {
          display: flex;
          width: 1070px;
          padding: 20px 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          border-radius: 5px;
          background: var(--gray-30, rgba(185, 185, 185, 0.3));
          .coupon-content-top {
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
          }
        }
        .couponImage {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          @media screen and (max-width: 576px) {
            padding: 0;
            margin-left: 12px;
          }
        }
        @media screen and (max-width: 576px) {
          .coupon-content {
            width: 390px;
            padding: 10px;
            overflow: hidden;
          }
        }
      `}</style>
    </>
  )
}
