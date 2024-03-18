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
          <h1 hidden>Boundless 線上音樂學習平台</h1>
          {/* 圖片輪播 */}
          <section className="carousel-section">
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
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
              <div class="carousel-inner" style={{ borderRadius: '10px' }}>
                <div class="carousel-item active" data-bs-interval="6000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_001.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div class="carousel-item" data-bs-interval="6000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_009.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div class="carousel-item" data-bs-interval="6000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_008.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div class="carousel-item" data-bs-interval="6000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_004.jpeg"
                    alt="..."
                    fill
                  />
                </div>
                <div class="carousel-item" data-bs-interval="6000">
                  <Image
                    src="/課程與師資/lesson_img/lesson_005.jpeg"
                    alt="..."
                    fill
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
          {/* 課程區塊 */}
          <section className="lesson-section row align-items-center mx-0">
            {/* 雲 */}
            <div className="cloud-item cloud1">
              <Image src="/asset/cloud1.png" width={185} height={120} />
            </div>
            <div className="cloud-item cloud2">
              <Image src="/asset/cloud2.png" width={380} height={200} />
            </div>
            <div className="cloud-item cloud3">
              <Image src="/asset/cloud1.png" width={240} height={160} />
            </div>
            <div className="col-6 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2 className="mb-5 text-center" style={{ fontSize: '40px' }}>
                從休閒到專業
                <br />
                精彩課程拓展你的音樂邊界
              </h2>
              <Link className="b-btn b-lesson-btn px-5 py-3" href="/lesson">
                開始探索
              </Link>
            </div>
            <div className="col-6 d-none d-sm-flex justify-content-end px-0">
              <div className="lesson-section-img">
                <Image src="/asset/lesson.png" fill />
              </div>
            </div>
            {/* 課程區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center">
                從休閒到專業
                <br />
                精彩課程拓展你的音樂邊界
              </h2>
              <div className="lesson-section-img my-3">
                <Image src="/asset/lesson_round.png" fill />
              </div>
              <Link className="b-btn b-lesson-btn px-4 py-2" href="/lesson">
                開始探索
              </Link>
            </div>
          </section>
          {/* 樂器區塊 */}
          <section className="instrument-section row align-items-center mx-0">
            <div className="col-6 d-none d-sm-flex justify-content-end px-0">
              <div className="instrument-section-img">
                <Image src="/asset/instrument.png" fill />
              </div>
            </div>
            <div className="col-6 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2
                className="mb-5 text-center"
                style={{ color: '#18a1ff', fontSize: '40px' }}
              >
                工欲善其事，必先利其器
                <br />
                百種樂器任君挑選
              </h2>
              <Link
                className="b-btn b-instrument-btn px-5 py-3"
                href="/instrument"
              >
                來去逛逛
              </Link>
            </div>
            {/* 樂器區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center" style={{ color: '18a1ff' }}>
                工欲善其事，必先利其器
                <br />
                百種樂器任君挑選
              </h2>
              <div className="instrument-section-img my-3">
                <Image src="/asset/instrument.png" fill />
              </div>
              <Link
                className="b-btn b-instrument-btn px-4 py-2"
                href="/instrument"
              >
                來去逛逛
              </Link>
            </div>
          </section>
          {/* 樂團區塊 */}
          <section className="jam-section row align-items-center mx-0">
            <div className="col-12 d-none d-sm-flex justify-content-end px-0">
              <div className="jam-section-img">
                <Image src="/asset/jam.png" fill />
              </div>
            </div>
            <div className="col-12 d-none d-sm-flex flex-column justify-content-center align-items-center px-5">
              <h2 className="mb-5 text-center" style={{ fontSize: '40px' }}>
                線上組團媒合助你尋覓知音&nbsp;&nbsp;Let’s JAM!
              </h2>
              <Link
                className="b-btn b-jam-btn px-5 py-3"
                href="/jam/recruit-list"
              >
                查看樂團
              </Link>
            </div>
            {/* 樂團區塊-手機版 */}
            <div className="d-flex d-sm-none flex-column align-items-center">
              <h2 className="text-center">
                線上組團媒合助你尋覓知音
                <br />
                Let’s JAM!
              </h2>
              <div className="jam-section-img my-3">
                <Image src="/asset/lesson_round.png" fill />
              </div>
              <Link
                className="b-btn b-jam-btn px-4 py-2"
                href="/jam/recruit-list"
              >
                查看樂團
              </Link>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
