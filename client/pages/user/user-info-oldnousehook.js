import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'

//圖片
import jamHero from '@/assets/jam-hero.png'
import avatar from '@/public/user/Meiyuyu.jpg'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'
import { jwtDecode } from 'jwt-decode'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'

export default function Test() {
  // ----------------------測試用 獲得所有使用者清單 ----------------------
  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/user')

      // 使用 res.json() 來解析 response 的 JSON 格式資料
      const usersData = await res.json()
      console.log(usersData)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  // ----------------------會員登入狀態  ----------------------

  // const { handleLoginStatus, getLoginUserData } = useAuth()
  const { handleLoginStatus } = useAuth()
  const [userData, setUserData] = useState()
  useEffect(() => {
    handleLoginStatus()
  }, [handleLoginStatus])

  // useEffect(() => {
  //   getLoginUserData()
  // }, [getLoginUserData])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getLoginUserData()
  //       const userData = await response.json()
  //       setUserData(userData)
  //     } catch (error) {
  //       console.error('Error fetching user data:', error)
  //     }
  //   }
  //   fetchData()
  // }, [getLoginUserData])

  // console.log(userData)

  //以下為觀察錯誤訊息
  // Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
  // useEffect(() => {
  //   let isMounted = true // 判斷組件是否還在掛載

  //   handleLoginStatus() // 做一些同步的操作

  //   if (isMounted) {
  //     getLoginUserData() // 異步操作
  //   }

  //   return () => {
  //     isMounted = false // 組件卸載時更新狀態
  //   }
  // }, [handleLoginStatus, getLoginUserData])
  // ----------------------會員登入狀態  ----------------------

  // ----------------------登入會員資料獲取 暫不用hook  ----------------------
  const [userName, setuserName] = useState([])
  const [userNickname, setuserNickname] = useState([])
  const [userGender, setuserGender] = useState([])
  const [userGenreLike, setuserGenreLike] = useState([])
  const [userPlayInstrument, setuserPlayInstrument] = useState([])
  const [userPrivacy, setuserPrivacy] = useState([])
  const [userBirthday, setuserBirthday] = useState([])
  const [userPhone, setuserPhone] = useState([])
  const [userEmail, setuserEmail] = useState([])
  const [userPostcode, setuserPostcode] = useState([])
  const [userCountry, setuserCountry] = useState([])
  const [userTownship, setuserTownship] = useState([])
  const [userAddress, setuserAddress] = useState([])
  const [userInfo, setuserInfo] = useState([])

  const [userImg, setuserImg] = useState([])
  const avatarImage = `/user/${userImg}`

  const appKey = 'userToken'
  const [token, setToken] = useState('')
  const getLoginUserData = async (e) => {
    // 拿取Token回傳後端驗證狀態
    const Loginusertoken = localStorage.getItem(appKey)

    if (!Loginusertoken) {
      console.error('沒有登入的token 故無法取得使用者資料。')
      return null
    }
    const userID = jwtDecode(Loginusertoken)
    const id = userID.id

    try {
      const response = await fetch(`http://localhost:3005/api/user/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Loginusertoken}`,
        },
        body: JSON.stringify(),
      })

      const LoginUserData = await response.json()
      console.log('Response from server:', LoginUserData)

      // setUserData(LoginUserData)
      // console.log(LoginUserData)

      // 在這裡處理後端返回的資料
      setuserName(LoginUserData.name)
      setuserNickname(LoginUserData.nickname)
      setuserGender(LoginUserData.gender)
      setuserGenreLike(LoginUserData.genre_like)
      setuserPlayInstrument(LoginUserData.play_instrument)
      setuserPrivacy(LoginUserData.privacy)
      setuserBirthday(LoginUserData.birthday)
      setuserPhone(LoginUserData.phone)
      setuserEmail(LoginUserData.email)
      setuserPostcode(LoginUserData.postcode)
      setuserCountry(LoginUserData.country)
      setuserTownship(LoginUserData.township)
      setuserAddress(LoginUserData.address)
      setuserInfo(LoginUserData.info)
      setuserImg(LoginUserData.img)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  useEffect(() => {
    // 在這裡呼叫 handleLoginStatus，確保 token 已經有值

    getLoginUserData()
  }, [])

  // ----------------------登入會員資料獲取 暫不用hook  ----------------------
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
  const sidebarData = [
    '會員資訊',
    '我的樂團',
    '我的訂單',
    '我的文章',
    '我的收藏',
    '我的優惠券 ',
    '我的課程',
    '我的訊息',
  ]

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

  return (
    <>
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
              <div className="sidebar-user-info">
                <div className="sidebar-user-info-imgBox">
                  <Image
                    src={avatarImage}
                    alt="user photo mb"
                    fill
                    priority="default" //不加的話Next 會問是否要加優先級
                    sizes="(max-width: 150px) 150px, 50vw"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">{userNickname}</div>
                  <div className="sidebar-user-info-band">樂團名稱</div>
                </div>
                {/* 更換大頭貼的功能暫定併回會員資訊 故不再sidebar顯示 */}
                {/* <div className="sidebar-user-info-Camera-img">
                  <Image src={avatar} alt="user photo mb" fill></Image>
                </div> */}
              </div>
              <ul className="d-flex flex-column">
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

              <Link href={`/jam/recruit-list`} className="sm-item active">
                會員資訊
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的樂團
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的訂單
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的文章
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的收藏
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的優惠券
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的課程
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的訊息
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>會員資訊</li>
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
                <div className="row">
                  <div
                    className="col-sm-10 col-12"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                  >
                    {/* ---------------------測試登入------------------- */}

                    {/* <p>目前登入狀態: {auth.isAuth ? '會員已登入' : '未登入'}</p>
                    <p>
                      <button
                        onClick={() => {
                          if (auth.isAuth) logout()
                          else login()
                        }}
                      >
                        {auth.isAuth ? '登出' : '登入'}
                      </button>
                      <button onClick={getUser}>取得使用者清單JSON</button>
                    </p>
                    <p>ID: {auth.userData.id}</p>
                    <p>帳號: {auth.userData.name}</p>
                    <p>電子信箱: {auth.userData.email}</p>
                    <hr /> */}
                    {/* ---------------------------------------- */}
                    <div className="user-content col-12">
                      <div className="user-content-top">
                        <div className="user-title-userInfo">會員資訊</div>
                        <div className="user-btnGroup">
                          <div className="user-btnGroup-btn1">
                            <div>預覽個人首頁</div>
                          </div>
                          <div className="user-btnGroup-btn2">
                            <div>編輯資訊</div>
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">真實姓名</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userName}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">暱稱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userNickname}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">性別</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userGender}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">喜歡曲風</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userGenreLike}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">演奏樂器</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userPlayInstrument}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">公開資訊</div>
                        <div className="user-info-item-checkBoxGroup ">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyBD"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyBD"
                            >
                              生日
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyPhone"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyPhone"
                            >
                              手機
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyEmail"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyEmail"
                            >
                              電子信箱
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">生日</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userBirthday}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">手機</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userPhone}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">信箱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userEmail}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">地址</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            {userPostcode}
                            {userCountry}
                            {userTownship}
                            {userAddress}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item-info">
                        <div className="user-info-item-info-titleText">
                          自我介紹
                        </div>
                        <div className="user-info-item-info2">
                          <div className="user-info-item-info-contentText">
                            {userInfo}
                          </div>
                        </div>
                      </div>
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
            width: 100px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: center;

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

        /* --------------- user-contect-acticle--------------- */

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

          .user-content {
            display: flex;
            width: 1070px;
            padding: 20px 10px;
            margin: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            border-radius: 5px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));
          }

          .user-content {
            max-width: 1076px;
            /* width: 1100px; */
            /* height: 705px; */
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
            background: rgba(185, 185, 185, 0.3);
            border-radius: 5px;
            flex-direction: column;
            justify-content: start;
            align-items: flex-start;
            gap: 5px;
            display: inline-flex;
            font-family: Noto Sans TC;
          }

          .user-content-top {
            align-self: stretch;
            justify-content: space-between;
            align-items: flex-start;
            display: inline-flex;
            word-wrap: break-word;
          }

          .user-title-userInfo {
            color: #0d3652;
            font-size: 28px;
            font-weight: 700;
          }

          .user-btnGroup {
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10px;
            display: flex;
            color: white;
            font-size: 18px;
            font-weight: 700;
          }

          .user-btnGroup-btn1 {
            padding: 10px;
            background: #b9b9b9;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }
          .user-btnGroup-btn2 {
            padding: 10px;
            background: #18a1ff;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }

          /* ------------------ */
          .user-info-item {
            align-self: stretch;
            justify-content: space-between;
            align-items: center;
            display: flex;

            .user-info-item-titleText {
              display: flex;
              color: #124365;
              font-size: 16px;
              font-family: Noto Sans TC;
              font-weight: 700;
              word-wrap: break-word;
            }

            .user-info-item-checkBoxGroup {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;
              color: #000;
            }

            .user-info-item-Content {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;

              .user-info-item-contentText {
                flex: 1 1 0;
                color: black;
                font-size: 16px;
                font-family: Noto Sans TC;
                font-weight: 400;
                word-wrap: break-word;
              }
            }
          }

          .user-info-item-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
          }

          .user-info-item-info-titleText {
            color: var(--primary-deep, #124365);
            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .user-info-item-info2 {
            display: flex;
            max-width: 900px;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
          }

          .user-info-item-info-contentText {
            flex: 1 0 0;
            color: #000;
            text-align: justify;

            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /*------------- RWD  ----------- */
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
              margin-bottom: 20px;

              .user-info-item {
                display: block;
              }

              .user-info-item-info {
                display: block;
              }
            }
          }
          /*------------- RWD  ----------- */
        }
      `}</style>
    </>
  )
}
