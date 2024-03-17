import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import MemberInfo from '@/components/jam/member-info'
import Apply from '@/components/jam/apply'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Index() {
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  // console.log(LoginUserData)
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  // -------------------------------------------------- 手機版本  --------------------------------------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <Head>
        <title>Boundless 線上音樂學習平台</title>
      </Head>
      <Toaster
        containerStyle={{
          top: 80,
          zIndex: 101,
        }}
      />
      <Navbar menuMbToggle={menuMbToggle} />
      <div
        className="container-fill position-relative"
        style={{ minHeight: '95svh' }}
      >
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
          <div
            className="mm-item"
            style={{ color: '#1581cc' }}
            role="presentation"
            onClick={() => {
              handleLogout()
            }}
          >
            登出
            <ImExit size={20} className="ms-2" />
          </div>
        </div>
        <div>
          <section className="carousel-section row">
            <div className="col-12 col-sm-6 d-sm-flex justify-content-center align-items-center px-0">
              <h1 className='text-center text-sm-start'>
                音樂無國界，學習無邊界<br></br>線上音樂學習平台Boundless
              </h1>
            </div>
            <div
              id="carouselExampleIndicators"
              class="carousel slide col-12 col-sm-8 px-0"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
              </div>
              <div class="carousel-inner" style={{ borderRadius: '5px' }}>
                <div class="carousel-item active" data-bs-interval="5000">
                  <img
                    src="/課程與師資/lesson_img/lesson_001.jpeg"
                    class="d-block w-100 object-fit-cover"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <img
                    src="/課程與師資/lesson_img/lesson_002.jpeg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <img
                    src="/課程與師資/lesson_img/lesson_003.jpeg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <img
                    src="/課程與師資/lesson_img/lesson_004.jpeg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item" data-bs-interval="5000">
                  <img
                    src="/課程與師資/lesson_img/lesson_005.jpeg"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
