import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
//試抓資料區
import Card from '@/components/lesson/lesson-card'
import Cardrwd from '@/components/lesson/lesson-card-rwd-data'
// import Lesson from '@/data/Lesson.json'

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

import BS5Pagination from '@/components/common/pagination.js'

import { useParams } from 'react-router-dom'

import Pagination from '@/components/lesson/pagination.js'


// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

export default function LessonList({ onSearch }) {
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [userData, setUserData] = useState()
  //檢查token
//   useEffect(() => {
//     handleLoginStatus()
//     //獲得資料
//     getLoginUserData()
//   }, [])
//   useEffect(() => {
//     handleLoginStatus()
//     //獲得資料
//     getLoginUserData()
//   }, [])
  //登出功能

  //檢查是否獲取資料
//   console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }
  // 舊版會警告 因為先渲染但沒路徑 bad
  // const avatarImage = `/user/${LoginUserData.img}`
  // const avatargoogle = `${LoginUserData.photo_url}`
  // const avatarDefault = `/user/avatar_userDefault.jpg`

  // ----------------------會員登入狀態  ----------------------


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


//FIXME分頁功能
  // ------------------------------------- 製作分頁 not done
    const [products, setProducts] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      handlePageClick()
    }, [CurrentPage])

    const handlePageClick = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/lesson/page/${page}`
        )
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

  //   const handlePrevPage = () => {
  //     setCurrentPage(prevPage => prevPage - 1);
  //   };

  //   const handleNextPage = () => {
  //     setCurrentPage(prevPage => prevPage + 1);
  //   };


  //-------------------連資料庫
  const initialUrl = 'http://localhost:3005/api/lesson'
  const [Lesson, setLesson] = useState([])

  function getLesson(initialUrl) {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/lesson'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          resolve(result)
          //   console.log(result)
          setLesson(result)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }
  useEffect(() => {
    getLesson(initialUrl)
  }, [initialUrl])

    //-----------------篩選功能 //FIXME
    
  const priceRange = (priceLow, priceHigh) => {
    if (priceLow !== '' && priceHigh !== '') {
      fetch(
        `http://localhost:3005/api/lesson?priceLow=${priceLow}&priceHigh=${priceHigh}`
      )
        .then((response) => response.json())
        .then((data) => setData(data))
    }
  }

  // 確保 priceLow 和 priceHigh 有被定義後再呼叫 priceRange 函式
//   priceRange(priceLow, priceHigh)


//   useEffect(() => {
//     if (priceLow !== '' && priceHigh !== '') {
//       fetch(
//         `http://localhost:3005/api/lesson?priceLow=${priceLow}&priceHigh=${priceHigh}`
//       )
//         .then((response) => response.json())
//         .then((data) => setData(data))
//     }
    //   }, [priceLow, priceHigh])
    
  //-------------------搜尋功能
  const [data, setData] = useState(Lesson)
  //-----------所有過濾資料功能傳回來的地方

  // 在组件中定义 isFiltered 状态，并提供一个函数来更新它的值
  const [isFiltered, setIsFiltered] = useState(false)

  const [search, setSearch] = useState('')
  const handleSearch = () => {
    // console.log('按鈕被點擊了')
    let newData
    if (search.trim() === '') {
      newData = Lesson
      //   console.log(newData)
    } else {
      newData = Lesson.filter((v, i) => {
        return v.name.includes(search)
      })
    }

    setData(newData)
    setIsFiltered(true)
  }
  //  useEffect(() => {
  //    getLesson()
  //  }, []) //FIXME不太懂這裡加這個的意思 少加了這個所以沒辦法在未搜尋狀態下顯示完整列表

  //-------------------排序功能
  //最熱門
  const sortBySales = () => {
    const sortedProducts = [...Lesson].sort((a, b) => b.sales - a.sales)
    setData(sortedProducts)
    setIsFiltered(true)
  }

  //依評價
  //FIXME沒有資料？
  //依時數
  const sortBylength = () => {
    const sortedProducts = [...Lesson].sort((a, b) => b.length - a.length)
    setData(sortedProducts)
    setIsFiltered(true)
  }

  //-------------------渲染分類功能li
  const [LessonCategory, setLessonCategory] = useState([])
  function getLessonCategory() {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/lesson/categories'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          resolve(result)
          //   console.log(result)
          setLessonCategory(result)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }

  useEffect(() => {
    getLessonCategory()
  }, [])

  //-------------------選定特定分類

  const [selectedCategory, setSelectedCategory] = useState('') // 儲存所選分類
  function handleCategoryChange(id) {
    console.log('Clicked on category with ID:', id)
    // 在這裡執行你的其他邏輯，比如更新狀態
    setSelectedCategory(id)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/lesson/category/${selectedCategory}`
        )
        const data = await response.json()
        console.log(data)

        setData(data) //連回渲染特定分類課程
      } catch (error) {
        console.error('Error fetching products:', error)
      }
      setIsFiltered(true)
    }
    //当selectedCategory变化时重新获取商品数据
    if (selectedCategory !== '') {
      fetchProducts()
    }
  }, [selectedCategory])

  //-------------------選定特定分類後 熱門課程消失 //FIXME回到原始url熱門課程出不來
  const { category } = useParams() // 从URL参数中获取category值
  const [showHotCourses, setShowHotCourses] = useState(true) // 控制是否显示热门课程部分

  useEffect(() => {
    //   如果URL中存在category参数，则隱藏热门课程部分
    if ('category') {
      setShowHotCourses(false)
    } else {
      // 否则顯示热门课程部分
      setShowHotCourses(true)
    }
  }, [category])
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
                  <Link href={'/lesson'}>全部</Link>
                </li>
                {/* 分類功能 */}
                {LessonCategory.map((v, index) => {
                  return (
                    <Link key={index} href={'/lesson/?category === `${v.id}'}>
                      <li onClick={() => handleCategoryChange(v.id)}>
                        {v.name}
                      </li>
                    </Link>
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
              <Link href={`/lesson`} className="sm-item active">
                全部
              </Link>
              {LessonCategory.map((v, index) => {
                return (
                  <Link
                    key={index}
                    href={`/lesson?${v.id}`}
                    className="sm-item"
                    onClick={() => handleCategoryChange(v.id)}
                  >
                    {v.name}
                  </Link>
                )
              })}
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
                  {/* ?? */}
                  <div
                    className="d-flex d-sm-none b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                  <div className="search input-group">
                    {/* 輸入欄位 */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="請輸入關鍵字..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div
                      // 搜尋按鈕
                      onClick={handleSearch}
                      className="search-btn btn d-flex justify-content-center align-items-center p-0"
                    >
                      <IoIosSearch size={25} />
                    </div>
                  </div>
                </div>
                {/* 手機版排序 */}
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
                      <option value="review">依評價</option>
                      <option value="classLength">依時數</option>
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
                          <div
                            className="filter-btn confirm-btn w-100 d-flex justify-content-center"
                            role="presentation"
                            onClick={priceRange}
                          >
                            確認
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* web版資料排序 */}
                  <div className="sort d-none d-sm-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      排序
                      <FaSortAmountDown size={14} />
                    </div>

                    <div className="sort-item " onClick={sortBySales}>
                      最熱門
                    </div>
                    <div className="sort-item">依評價</div>
                    <div className="sort-item" onClick={sortBylength}>
                      依時數
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <div className="content">
              {showHotCourses && (
                <div className="hot-lesson">
                  <h4 className="text-primary">熱門課程</h4>
                  <div className="hot-lesson-card-group">
                    {Lesson.slice() // Create a copy of data array to avoid mutating original array
                      .sort((a, b) => b.sales - a.sales) // Sort courses based on sales volume
                      .slice(0, 4) // Get top 4 courses */
                      .map((v, i) => {
                        return (
                          <div className="hot-lesson-card" key={i}>
                            <Card
                              course-card
                              id={v.id}
                              luid={v.puid}
                              name={v.name}
                              price={v.price}
                              teacher_id={v.teacher_id}
                              img={v.img}
                              length={v.length}
                              sales={v.sales}
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
              )}
              <hr />
              {/*-------- 列表頁卡片迴圈------- */}
              <div className="lesson-card-group">
                {/* 更改為搜尋過後篩選出來的課程 */}

                {isFiltered &&
                  // 如果已经进行了筛选或搜索，渲染筛选后的 Lesson 数据
                  data.map((v, i) => {
                    const {
                      id,
                      puid,
                      name,
                      price,
                      teacher_id,
                      img,
                      sales,
                      length,
                    } = v
                    return (
                      <div className="mb-4" key={id}>
                        {isSmallScreen ? (
                          <Cardrwd
                            id={id}
                            luid={puid}
                            name={name}
                            price={price}
                            teacher_id={teacher_id}
                            img={img}
                            sales={sales}
                            length={length}
                            user_id={user_id}
                          />
                        ) : (
                          <Card
                            course-card
                            id={id}
                            luid={puid}
                            name={name}
                            price={price}
                            teacher_id={teacher_id}
                            img={img}
                            sales={sales}
                            length={length}
                          />
                        )}
                      </div>
                    )
                  })}

                {!isFiltered &&
                  // 如果没有进行筛选或搜索，渲染原始的 Lesson 数据
                  Lesson.map((v, i) => {
                    const {
                      id,
                      puid,
                      name,
                      price,
                      teacher_id,
                      img,
                      sales,
                      length,
                    } = v
                    return (
                      <div className="mb-4" key={id}>
                        {isSmallScreen ? (
                          <Cardrwd
                            id={id}
                            luid={puid}
                            name={name}
                            price={price}
                            teacher_id={teacher_id}
                            img={img}
                            sales={sales}
                            length={length}
                          />
                        ) : (
                          <Card
                            id={id}
                            luid={puid}
                            name={name}
                            price={price}
                            teacher_id={teacher_id}
                            img={img}
                            sales={sales}
                            length={length}
                          />
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <BS5Pagination
          forcePage={CurrentPage - 1}
          onPageChange={handlePageClick}
          pageCount={totalPages}
        />
        {/* <Pagination
          totalPages={Math.ceil(filteredProducts.length / perPage)}
                  setFilterSettings={setFilterSettings}
                  page={setFilterSettings.page}
        /> */}
      </div>
      <Footer />
      <style jsx>{`
        .content {
          padding-inline: 22px;
        }
        .lesson-card-group {
          display: flex;
          margin-block: 30px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hot-lesson-card-group {
          margin-block: 30px;
          gap: 10px;
          display: flex;
          justify-content: space-between;
        }
        @media screen and (max-width: 576px) {
          .content {
            padding-inline: 0;
          }
          .hot-lesson {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
