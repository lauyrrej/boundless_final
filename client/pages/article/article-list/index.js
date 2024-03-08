import { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
// icons
import { MdNoteAdd } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import bookmarkIconFill from '@/assets/fillbookmark.svg'
import bookmarkIcon from '@/assets/emptybookmark.svg'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import ArticleCard from '@/components/article/article-card'

export default function ArticleList() {
  // ----------------------手機版本  ----------------------
  // 後端資料庫
  const [article, setArticle] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getDatas = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/article`)
        const datas = await res.json()
        if (datas) {
          setArticle(datas) // 設定獲取的文章數據到狀態中
          // console.log(datas)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getDatas() // 在元件渲染後立即獲取文章數據
  }, []) // 空的依賴陣列表示只在元件第一次渲染時執行一次

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

  // ----------------------功能  ----------------------

  // 搜尋功能
  // const handleSearch = () => {
  //   let newData
  //   if (search.trim() === '') {
  //     newData = article
  //     // 若搜尋為空，使用原始文章資料
  //   } else {
  //     article
  //     newData = article.filter((v, i) => {
  //       return v.title.includes(search)
  //     })
  //   }
  //   setArticle(newData)
  // }

  const filterArticle = useMemo(() => {
    return article.filter((v) => {
      return v.title.includes(search)
    })
  }, [article, search])

  // ------------------分類category_id的資料庫------------------------
  // const filterArticle = useMemo(() => {
  //   return article.filter((v) => {
  //     // 檢查文章的標題是否包含搜尋關鍵字
  //     const titleMatch = v.title.includes(search)
  //     // 檢查文章的 category_id 是否為 2
  //     const categoryIdMatch = v.category_id === 2
  //     // 將上述條件組合起來，若兩者皆符合則返回 true，否則返回 false
  //     return titleMatch && categoryIdMatch
  //   })
  // }, [article, search])

  // ----------------------分類功能  ----------------------

  // 純func書籤
  const handleToggleFav = (id) => {
    const newArticles = article.map((v, i) => {
      if (v.id === id) return { ...v, fav: !v.fav }
      else return v
    })
    setArticle(newArticles)
  }
  // ----------------------假資料  ----------------------
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

  // ------------------------- 搜尋/篩選
  const router = useRouter()
  // 全部的篩選條件
  const allCondition = ''
  const [condition, setCondition] = useState(allCondition)
  useEffect(() => {}, [allCondition])

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="page-shero d-none d-sm-block">
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
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
          {/* -----------sidebar------------ */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <ul className="d-flex flex-column">
                <li>
                  <Link href={`/article/article-list`} className="active">
                    全部
                  </Link>
                </li>
                <li>
                  <Link href={`/article/article-list/article-rate`}>
                    音樂評論
                  </Link>
                </li>
                <li>
                  <Link href={`/article/article-list/article-tec`}>
                    技術分享
                  </Link>
                </li>
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
              <Link href={`/article/article-list`} className="sm-item active">
                全部
              </Link>
              <Link href={`/article/article-rate`} className="sm-item">
                樂評
              </Link>
              <Link href={`/article/article-tec`} className="sm-item">
                技術分享
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>樂友論壇</li>
                </ul>
              </div>

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
                  <div className="search input-group">
                    <input
                      className="form-control"
                      placeholder="請輸入關鍵字..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="search"
                    />
                    <div
                      // onClick={handleSearch}
                      className="search-btn btn d-flex justify-content-center align-items-center p-0"
                    >
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
                      <option selected value="latest">
                        新到舊
                      </option>
                      <option value="oldest">舊到新</option>
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
                        className={`filter ${
                          filterVisible === false ? 'd-none' : 'd-block'
                        }`}
                        onClick={stopPropagation}
                        role="presentation"
                      >
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
                                      className="form-check-input"
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
                      新到舊
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
                      舊到新
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content me-2">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-primary pt-2">熱門文章</h4>
                <Link href={`/article/article-publish`} className="icon-btn">
                  <MdNoteAdd
                    size={35}
                    style={{ color: 'gray', cursor: 'pointer' }}
                  />
                </Link>
              </div>
              <div className="content-pop d-flex flex-wrap">
                {filterArticle.slice(0, 4).map((v, i) => {
                  {
                    /* 熱門文章的分類目前是抓前4筆 */
                  }
                  const {
                    id,
                    title,
                    content,
                    img,
                    user_id,
                    author,
                    published_time,
                    articles,
                    fav,
                    category_id,
                  } = v
                  return (
                    <ArticleCard
                      key={id}
                      id={id}
                      user_id={user_id}
                      title={title}
                      content={content}
                      img={img}
                      author={author}
                      category_id={category_id}
                      published_time={published_time}
                      articles={articles}
                      handleToggleFav={handleToggleFav}
                      fav={fav}
                    />
                  )
                })}
              </div>
              <hr />
              <div className="content-pop d-flex flex-wrap">
                {filterArticle.map((v, i) => {
                  const {
                    id,
                    title,
                    content,
                    img,
                    user_id,
                    author,
                    published_time,
                    articles,
                    fav,
                    category_id,
                  } = v
                  return (
                    <ArticleCard
                      key={id}
                      user_id={user_id}
                      id={id}
                      title={title}
                      content={content}
                      img={img}
                      author={author}
                      category_id={category_id}
                      published_time={published_time}
                      articles={articles}
                      handleToggleFav={handleToggleFav}
                      fav={fav}
                    />
                  )
                })}
              </div>
              {/* <div className='d-flex justify-content-center pb-3'>
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
              </div> */}
            </main>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{``}</style>
    </>
  )
}
