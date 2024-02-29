import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Card from '@/components/lesson/lesson-card'
import Cardrwd from '@/components/lesson/lesson-card-rwd'
import Link from 'next/link'
import Image from 'next/image'
import lessonHero from '@/assets/lesson-hero.jpg'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

export default function Test() {
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

  // ----------------------條件篩選  ----------------------
  const [filterVisible, setFilterVisible] = useState(false)

  useEffect(() => {
    document.addEventListener('click', () => {
      setFilterVisible(false)
    }) //鉤子在組件渲染完成後註冊了一個點擊事件監聽器。當點擊事件發生時，會調用一個函數來將 filterVisible 設置為 false，從而隱藏篩選表單。
  }, []) //這個事件監聽器只會在組件首次渲染時被註冊，並且在組件卸載時被清理。
  // 阻止事件冒泡造成篩選表單關閉//防止觸發組件外部的點擊事件，進而導致篩選表單被關閉。
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }
  // ----------------------假資料  ----------------------
  // 資料排序
  const [dataSort, setDataSort] = useState('upToDate')
  // sidebar假資料
  const sidebarData = [
    '歌唱技巧',
    '樂器演奏',
    '音樂理論',
    '詞曲創作',
    '軟體操作',
    '活動專區',
  ]
  const [priceLow, setPriceLow] = useState('')
  const [priceHigh, setPriceHigh] = useState('')
  // 課程評價
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')

  // 促銷課程
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
  }

  let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="hero d-none d-sm-block">
        <Image
          src={lessonHero}
          className="object-fit-cover w-100"
          alt="cover"
        />
      </div>
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
          <div className="sidebar-wrapper d-none d-sm-block  col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                <li>
                  <Link href={'/lesson/all'}>全部</Link>
                </li>
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
              <Link href={`/instrument/instrument`} className="sm-item active">
                全部
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                歌唱技巧
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                樂器演奏
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                音樂理論
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                詞曲創作
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                軟體操作
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                活動專區
              </Link>
            </div>

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

              <div className="top-function-flex">
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
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
                      <option selected value="upToDate">
                        最熱門
                      </option>
                      <option value="recent">依評價</option>
                      <option value="recent">依時數</option>
                    </select>
                  </div>

                  {/* 條件篩選 */}
                  <form className="d-flex align-items-center  position-relative">
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
                        {/* 價格區間 */}
                        <div className="filter-item">
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
                        </div>
                        {/* 商品評價 */}
                        <div className="filter-item m-0">
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
                        </div>
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
                        <div className="d-flex justify-content-between gap-2">
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
                  {/* 資料排序 */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
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
              <div className="lesson-card-group">
                {arr.map((i, index) => {
                  return (
                    <div key={index} className="mb-4">
                      {isSmallScreen ? <Cardrwd /> : <Card />}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .lesson-card-group {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: flex-start;
          align-content: flex-start;
          align-self: 'stretch';
        }
      `}</style>
    </>
  )
}
