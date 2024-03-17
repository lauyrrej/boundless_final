import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import Datetime from '@/components/article/datetime'
import { Tiptap } from '@/components/article/TipTap'
import Details from '@/components/article/Details'

export default function Auid() {
  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  // ----------------------要資料  ----------------------

  // ----------------------跟後端要資料  ----------------------
  //-----------------------動態路由
  //  由router中獲得動態路由(屬性名稱pid，即檔案[pid].js)的值，router.query中會包含pid屬性
  // 1. 執行(呼叫)useRouter，會回傳一個路由器
  // 2. router.isReady(布林值)，true代表本元件已完成水合作用(hydration)，可以取得router.query的值
  const router = useRouter()

  // ----------------------全部資料----------------------
  const [articleDetail, setArticleDetail] = useState({})
  const getSingleDetail = async (auid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/article/${auid}`)
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型有值，以避免錯誤
      if (data) {
        setArticleDetail(data[0])
        // 只拿第一筆資料
        // console.log(articleDetail.title)
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 初次渲染"之後(After)"+router.isReady改變時，執行其中程式碼
  useEffect(() => {
    // 如果isReady是true，確保能得到query的值
    if (router.isReady) {
      const { auid } = router.query
      getSingleDetail(auid)
    }
  }, [router.isReady])
  // ----------------------假資料  ----------------------

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

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
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
          {/* 麵包屑 */}
          <div className="breadcrumb-wrapper-ns">
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <li style={{ marginLeft: '8px' }}>樂友論壇</li>
              <FaChevronRight />
              <Link href="/article/article-list">
                <li style={{ marginLeft: '10px' }}>文章資訊</li>
              </Link>
              <FaChevronRight />
              <Link href="/article/article-list">
                <li style={{ marginLeft: '10px' }}>文章內文</li>
              </Link>
            </ul>
          </div>
          <div className="">
            {/* 主內容 */}
            <main className="content">
              <div className="">
                <Tiptap />
              </div>
              <div className="main-img">
                <Image
                  src={`/article/${articleDetail.img}`}
                  alt=""
                  className="big-pic object-fit-contain w-100"
                  responsive
                  fill
                />
              </div>
              <div className="article-label d-flex pt-4 ps-3">
                <div className="bg-dark text-light pt-1 pb-1 ps-2 pe-2 me-3">
                  標籤
                </div>
                <div className="pt-1 pb-1 ps-2 pe-2">
                  {articleDetail.category_name}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="page-button d-flex justify-content-between pt-5 pb-4">
          <button type="button" className="btn">
            上一步
          </button>
          <button type="button" className="btn btn-primary">
            確認更新
          </button>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .wrapper {
          padding-left: 20px;
          padding-right: 20px;
        }
        .nav-category {
          display: flex;
          justify-content: between;
        }
        @media screen and (max-width: 576px) {
          .nav-category {
            display: none;
          }
        }
        main {
          padding-left: 55px;
          padding-right: 55px;
        }
        h1 {
          padding-top: 5;
        }
        @media screen and (max-width: 576px) {
          h1 {
            padding-top: 0;
          }
        }
        .breadcrumb-wrapper {
          margin-top: 50px;
          margin-left: 50px;
        }
        @media screen and (max-width: 576px) {
          .breadcrumb-wrapper {
            margin-top: 30px;
            margin-left: 10px;
          }
        }
        .main-img {
          position: relative;
          weight: 1000px;
          height: 500px;
          margin-top: 10px;
        }
        .big-pic {
          position: absolute;
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 576px) {
          .main-img {
            weight: 576px;
            height: 300px;
          }
        }
      `}</style>
    </>
  )
}
