import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Card from '@/components/instrument/card.js'
import Link from 'next/link'
import Image from 'next/image'
import productlistHero from '@/assets/product-list-hero.jpg'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import Data from '@/data/instrument/instrument.json'

export default function Test() {
  //a
  // console.log(Data)
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
  // sidebar假資料
  const sidebarData = [
    { id: 1, parent_id: null, name: '吉他' },
    { id: 2, parent_id: null, name: '貝斯' },
    { id: 3, parent_id: null, name: '鍵盤樂器' },
    { id: 4, parent_id: null, name: '打擊樂器' },
    { id: 5, parent_id: null, name: '弓弦樂器' },
    { id: 6, parent_id: null, name: '管樂器' },
    { id: 7, parent_id: null, name: '音響設備' },
    { id: 8, parent_id: 1, name: '電吉他' },
    { id: 9, parent_id: 1, name: '木吉他' },
  ]
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
  // 商品評價
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')

  // 促銷商品
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setBrandSelect('all')
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
  }

  // const hotSales = Data.sort
  //-------------------連資料庫

  const [instrument, setInstrument] = useState([])
  console.log(instrument)
  useEffect(async () => {
    await getInstrument()
  }, [])
  function getInstrument() {
    return new Promise((resolve, reject) => {
      let url = 'http://localhost:3005/api/instrument'
      fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          resolve(result)
          console.log(result)
          setInstrument(result)
        })
        .catch((error) => {
          console.log(error)
          reject()
        })
    })
  }
  const [openAccordion, setOpenAccordion] = useState(null)

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="hero d-none d-sm-block">
        <Image
          src={productlistHero}
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
                  <Link href={'/instrument/all'} className="active">
                    全部
                  </Link>
                </li>
                {sidebarData.map((item, index) => {
                  if (!item.parent_id) {
                    return (
                      <div
                        key={index}
                        className="accordion accordion-flush"
                        id={`accordion-${index}`}
                      >
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button collapsed ${
                                openAccordion === index ? 'active' : ''
                              }`}
                              type="button"
                              onClick={() => handleAccordionToggle(index)}
                            >
                              {item.name}
                            </button>
                          </h2>
                          <div
                            id={`collapse-${index}`}
                            className={`accordion-collapse collapse ${
                              openAccordion === index ? 'show' : ''
                            }`}
                          >
                            <div className="accordion-body px-1">
                              {/* 這裡放入你的 checkbox 內容 */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox-${index}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`checkbox-${index}`}
                                >
                                  木吉他
                                </label>
                              </div>
                              {/* 重複以上的結構，加入其他 checkbox */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={`checkbox-${index}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`checkbox-${index}`}
                                >
                                  電吉他
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                  <Link href={'/instrument/event'}>活動專區</Link>
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
              <Link href={`/instrument/instrument`} className="sm-item active">
                全部
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                吉他
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                貝斯
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                鍵盤樂器
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                打擊樂器
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                弓弦樂器
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                管樂器
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                音響設備
              </Link>
              <Link href={`/instrument/instrument`} className="sm-item">
                活動專區
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>樂器商域</li>
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
                        最熱銷
                      </option>
                      <option value="recent">最高價</option>
                      <option value="recent">最低價</option>
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

                    <div className="sort-item active">最熱銷</div>
                    <div className="sort-item">最高價</div>
                    <div className="sort-item">最低價</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 主內容 */}
            <main className="content">
              <div className="hot-instrument">
                <h4 className="text-primary">熱銷商品</h4>
                <div className="hot-instrument-card">
                  {instrument.slice(0, 4).map((v, i) => {
                    const {
                      id,
                      name,
                      price,
                      discount,
                      category_name,
                      img_small,
                      sales,
                    } = v

                    return (
                      <div key={id} className="">
                        {/* 寫discount的判斷式 */}
                        <Card
                          id={id}
                          name={name}
                          price={price}
                          discount={discount}
                          category_name={category_name}
                          img_small={img_small}
                          sales={sales}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              <hr />

              <div className="instrument-card-group">
                {/* 用json套資料 */}
                {instrument.map((v, i) => {
                  const {
                    id,
                    name,
                    price,
                    discount,
                    category_name,
                    img_small,
                    sales,
                  } = v
                  return (
                    <div key={id} className="">
                      {/* 寫discount的判斷式 */}
                      <Card
                        id={id}
                        name={name}
                        price={price}
                        discount={discount}
                        category_name={category_name}
                        img_small={img_small}
                        sales={sales}
                      />
                    </div>
                  )
                })}
              </div>
            </main>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .content {
          display: block;
        }
        .instrument-card-group {
          display: flex;
          justify-content: space-between;
          margin-block: 30px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hot-instrument-card {
          margin-block: 30px;
          gap: 10px;
          display: flex;
          justify-content: space-between;
        }
        @media screen and (max-width: 576px) {
          .hot-instrument-card {
            flex-wrap: wrap;
          }
          .hot-instrument-card > :global(div) {
            flex-basis: calc(
              40% - 40px
            ); /* Two cards in a row with a 10px gap */
          }
        }
      `}</style>
    </>
  )
}
