import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

export default function UserJam() {
  const router = useRouter()
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [myApply, setMyApply] = useState([])
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  //登出功能

  //檢查是否獲取資料
  console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }

  // ----------------------會員登入狀態  ----------------------
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
  const getMyApply = async (uid) => {
    // console.log(uid)
    try {
      const res = await fetch(`http://localhost:3005/api/jam/getMyApply/${uid}`)
      const datas = await res.json()
      if (datas.status === 'success') {
        setMyApply(datas.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 若有樂團，則會直接導向所屬樂團
  useEffect(() => {
    if (LoginUserData.my_jam) {
      router.push(`../jam/recruit-list/${LoginUserData.my_jam}`)
    }
    getMyApply(LoginUserData.uid)
    // 必須確定LoginUserData.uid已經讀入
  }, [LoginUserData.uid])
  return (
    <>
      <Head>
        <title>我的樂團</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HEROSECTION隱藏 */}
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
                  <Link href="/coupon/userCoupon">我的優惠券</Link>
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

              <Link href="/user/user-info" className="sm-item">
                會員資訊
              </Link>

              <Link href="/user/user-jam" className="sm-item active">
                我的樂團
              </Link>

              <Link href="/user/user-order" className="sm-item">
                我的訂單
              </Link>

              <Link href="/user/user-acticle" className="sm-item">
                我的文章
              </Link>

              <Link href="/user/user-favorite" className="sm-item">
                我的收藏
              </Link>

              <Link href="/coupon/userCoupon" className="sm-item">
                我的優惠券
              </Link>

              <Link href="/user/user-lesson" className="sm-item">
                我的課程
              </Link>

              <Link href="/user/user-notify" className="sm-item">
                我的訊息
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}

            <div className="user-top-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>我的樂團</li>
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
                </div>
              </div>
            </div>
            {/* 主內容 */}
            <main className="content">
              <div className="container custom-container">
                <div
                  className=""
                  style={{
                    backgroundColor: 'rgb(255, 255, 255)',
                  }}
                >
                  <div className="user-content">
                    <div className="user-content-top">
                      <div className="user-title-userInfo">樂團申請</div>
                    </div>

                    <div className="user-notifyList ">
                      <div className="user-notifyList-item row flex-nowrap gap-2">
                        <div
                          className="fw-medium col-3 col-sm-2"
                          style={{ color: '#124365', paddingInline: '0' }}
                        >
                          申請樂團
                        </div>
                        <div
                          className="fw-medium col-3"
                          style={{ color: '#124365', paddingInline: '0' }}
                        >
                          申請職位
                        </div>
                        <div
                          className="fw-medium col-3"
                          style={{ color: '#124365', paddingInline: '0' }}
                        >
                          審核狀態
                        </div>
                        <div
                          className="fw-medium col-3"
                          style={{ color: '#124365', paddingInline: '0' }}
                        >
                          功能
                        </div>
                      </div>
                      <hr style={{ color: '#124365', marginInline: '0' }} />
                      {myApply.map((v) => {
                        return (
                          <div
                            className="user-notifyList-item row flex-nowrap gap-2"
                            key={v.id}
                          >
                            <div
                              className="fw-medium col-3 col-sm-2"
                              style={{ color: '#124365', paddingInline: '0' }}
                            >
                              申請樂團
                            </div>
                            <div
                              className="fw-medium col-3"
                              style={{ color: '#124365', paddingInline: '0' }}
                            >
                              職位
                            </div>
                            <div
                              className="fw-medium col-3"
                              style={{ color: '#124365', paddingInline: '0' }}
                            >
                              審核狀態
                            </div>
                            <div
                              className="fw-medium col-3"
                              style={{ color: '#124365', paddingInline: '0' }}
                            >
                              功能
                            </div>
                          </div>
                        )
                      })}
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
        .content {
          min-height: calc(100svh - 120px);
          padding-bottom: 30px;
          @media screen and (max-width: 576px) {
            padding-top: 30px;
            padding-inline: 20px;
            min-height: calc(100svh - 146px);
          }
        }
        .user-top-container {
          width: 100%;
          background-color: #fff;
          padding-block: 20px 0px;
          position: -webkit-sticky;
          position: sticky;
          top: 10px;
          z-index: 100;
          @media screen and (max-width: 576px) {
            top: 60px;
            padding-block: 20px 16px;
            padding-inline: 12px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
          }
        }
        /* -------------------user sidebar-------------------- */
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

            width: 140px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: start;

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

        /* -------------------user sidebar-------------------- */
        /* --------------- user-contect-notify--------------- */
        hr {
          margin: 10px;
        }
        .custom-container {
          padding: 0;
          color: #000;

          & p {
            font-family: 'Noto Sans TC';
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #000;
            text-overflow: ellipsis;
          }
          & h5 {
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: var(--primary-deep, #124365);
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        .user-content {
          display: flex;

          padding: 20px 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
          border-radius: 5px;
          background: var(--gray-30, rgba(185, 185, 185, 0.3));

          .user-content-top {
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

            .user-notify-newBtn {
              display: none;
            }
          }
          /*----------------------notify css----------------------- */
          .user-notifyList {
            width: 100%;
            overflow: auto;
          }

          .user-notifyList-item {
            align-items: center;
            padding-left: 4px;
            margin-inline: auto;
            /*height: 60px; */

            .user-notifyList-item-notifyLabel {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
            .user-notifyList-item-type {
              /*text-align: end;*/
            }
            .user-notifyList-item-message {
              color: var(--primary-deep, #124365);
            }
          }

          /*----------------------notify css----------------------- */

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /* RWD讓SIDEBAR消失 測試用記得刪 */
        @media screen and (max-width: 576px) {
          body {
            padding-inline: 20px;
          }

          .custom-container {
            overflow: hidden;

            .user-content {
              width: 390px;
              padding: 10px;
              overflow: hidden;
            }
          }

          .user-content {
            .user-notifyList-item {
              padding-left: 0px;
              font-size: 16px;

              .user-notifyList-item-notifyLabel {
                -webkit-line-clamp: 2;
              }

              .user-notifyList-item-type {
                font-size: 16px;
              }
            }
          }
        }
        /* RWD讓SIDEBAR消失 測試用記得刪 */
      `}</style>
    </>
  )
}
