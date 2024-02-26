import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Card from '@/components/instrument/card'
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
  // ----------------------假資料  ----------------------
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

  let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

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
                  <Link href={'/instrument/event'}>活動專區</Link>
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
                  <form
                    action="/template-with-sidebar"
                    method="get"
                    className="d-flex aligh-items-center  position-relative"
                  >
                    <div
                      className="filter-text d-flex align-items-center me-3"
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

      <style jsx>{``}</style>
    </>
  )
}
