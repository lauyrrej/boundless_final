import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
// data
import CityCountyData from '@/data/CityCountyData.json'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
// 自製元件
import ArticleCard from '@/components/article/article-card'
import { useRouter } from 'next/router'

export default function Test() {
  const router = useRouter()
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
  // ----------------------假資料  ----------------------
  // 資料排序
  const [dataSort, setDataSort] = useState('upToDate')
  // filter假資料

  // ArticleCard 假資料
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // 樂手類型資料
  const playerData = [
    { id: 1, name: '木吉他' },
    { id: 2, name: '電吉他' },
    { id: 3, name: '貝斯' },
    { id: 4, name: '電貝斯' },
    { id: 5, name: '鋼琴' },
    { id: 6, name: '爵士鼓' },
    { id: 7, name: '薩克斯風' },
    { id: 8, name: '小提琴' },
  ]
  const [player, setPlayer] = useState('all')

  const genereData = [
    { id: 1, name: '民謠' },
    { id: 2, name: '搖滾' },
    { id: 3, name: '金屬' },
    { id: 4, name: '嘻哈' },
    { id: 5, name: '靈魂' },
    { id: 6, name: '世界音樂' },
    { id: 7, name: '電子' },
    { id: 8, name: '古典' },
  ]
  const [genere, setGenere] = useState('all')

  const [degree, setDegree] = useState('all')
  // 篩選城市用的資料
  const cityData = CityCountyData.map((v, i) => {
    return v.CityName
  })
  const [region, setRegion] = useState('all')

  // 清除表單內容
  const cleanFilter = () => {
    setPlayer('all')
    setGenere('all')
    setDegree('all')
    setRegion('all')
  }

  return (
    <>
      <div onClick={() => { router.push("product", "Joeisgood") }}>Product</div>
      <div onClick={() => { router.replace("product", "Joeisgood") }}>Product2</div>

      <Navbar menuMbToggle={menuMbToggle} />
      <div className="page-shero d-none d-sm-block">
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div>
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${showMenu ? 'menu-mb-show' : ''
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
              <ul className="d-flex flex-column">
                <li>
                  <Link href={`/jam/recruit-list`} className="active">
                    團員募集
                  </Link>
                </li>
                <li>
                  <Link href={`/jam/jam-list`}>活動中的JAM</Link>
                </li>
                <li>
                  <Link href={`/jam/Q&A`}>什麼是JAM？</Link>
                </li>
              </ul>
            </div>
          </div>

          {/*   ----------------------頁面內容  ---------------------- */}
          <div className="col-12 col-sm-10 page-control">
            {/* 手機版sidebar */}
            <div
              className={`sidebar-mb d-sm-none ${showSidebar ? 'sidebar-mb-show' : ''
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
              <Link href={`/jam/recruit-list`} className="sm-item active">
                團員募集
              </Link>
              <Link href={`/jam/jam-list`} className="sm-item">
                活動中的JAM
              </Link>
              <Link href={`/jam/Q&A`} className="sm-item">
                什麼是JAM？
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>團員募集</li>
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
                        即將到期
                      </option>
                      <option value="recent">最近發起</option>
                    </select>
                  </div>
                  {/*  ---------------------- 條件篩選  ---------------------- */}
                  <form className="d-flex align-items-center  position-relative">
                    <div
                      className="filter-text d-flex align-items-center me-sm-4"
                      role="presentation"
                      onClick={onshow}
                    >
                      條件篩選
                      <FaFilter size={13} />
                      <div
                        className={`filter ${filterVisible === false ? 'd-none' : 'd-block'
                          }`}
                        onClick={stopPropagation}
                        role="presentation"
                      >
                        {/* 徵求樂手 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#18a1ff' }}
                          >
                            徵求樂手
                          </div>
                          <select
                            className="form-select"
                            value={player}
                            name="player"
                            onChange={(e) => {
                              setPlayer(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              全部
                            </option>
                            {playerData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* 音樂風格 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#faad14' }}
                          >
                            音樂風格
                          </div>
                          <select
                            className="form-select"
                            value={genere}
                            name="genere"
                            onChange={(e) => {
                              setGenere(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              全部
                            </option>
                            {genereData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* 技術程度 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#5a5a5a' }}
                          >
                            技術程度
                          </div>
                          <select
                            className="form-select"
                            value={degree}
                            name="degree"
                            onChange={(e) => {
                              setDegree(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              全部
                            </option>
                            <option value="1">新手練功</option>
                            <option value="2">老手同樂</option>
                          </select>
                        </div>
                        {/* 地區 */}
                        <div className="filter-item">
                          <div
                            className="filter-title"
                            style={{ color: '#1d1d1d' }}
                          >
                            地區
                          </div>
                          <select
                            className="form-select"
                            value={region}
                            name="region"
                            onChange={(e) => {
                              setRegion(e.target.value)
                            }}
                          >
                            <option selected value="all">
                              全部
                            </option>
                            {cityData.map((v, i) => {
                              return (
                                <option key={i} value={v}>
                                  {v}
                                </option>
                              )
                            })}
                          </select>
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
                  {/* ---------------------- 資料排序  ---------------------- */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>
                    <div
                      className={`sort-item ${dataSort === 'upToDate' ? 'active' : ''
                        }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('upToDate')
                      }}
                    >
                      即將到期
                    </div>
                    <div
                      className={`sort-item ${dataSort === 'recent' ? 'active' : ''
                        }`}
                      role="presentation"
                      onClick={(e) => {
                        setDataSort('recent')
                      }}
                    >
                      最近發起
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              {arr.map((item, index) => (
                <ArticleCard key={index} />
              ))}
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
        .content {
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