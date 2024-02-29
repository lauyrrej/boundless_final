import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import avatar from '@/public/user/Meiyuyu.jpg'

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
                    style={{ width: 100, height: 100, resizeMode: 'cover' }}
                    src={avatar}
                    alt="user photo mb"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">棉悠悠</div>
                  <div className="sidebar-user-info-band">幻獸帕魯</div>
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
                            鍾傑元
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">暱稱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">阿傑</div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">性別</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">男</div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">喜歡曲風</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            金屬、搖滾
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">演奏樂器</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">貝斯</div>
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
                            1985-01-19
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">手機</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            0910047354
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">信箱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            harmon4652@gmail.com
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">地址</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            臺東縣臺東市同樂街87號6樓
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item-info">
                        <div className="user-info-item-info-titleText">
                          自我介紹
                        </div>
                        <div className="user-info-item-info2">
                          <div className="user-info-item-info-contentText">
                            嗨，大家好，我是阿傑！我的音樂旅程始於青少年時期，當時我對貝斯的低沉與穩定的音色深感著迷。這把強而有力的樂器成為我表達情感的媒介，並啟發我不斷追求音樂創作的腳步。
                            <br />
                            我的演奏風格融合了多種音樂元素，從爵士樂的靈活性到搖滾樂的澎湃力道，我喜歡在音符之間探索各種可能性。音樂對我而言不僅僅是一種技能，更是一種生活的態度，一種能夠連結人心的語言。
                            <br />
                            在這支樂團中，我將負責打造穩固的節奏底層，並以創意豐富的貝斯線條為樂曲增色。我相信每一個音符都有其特殊的故事，而我將竭盡所能，透過貝斯的振奏，向大家傳達那些動人的音樂故事。
                            <br />
                            不論是舞台上的熱情演奏還是幕後的音樂創作，我都全心全意地致力於音樂之中。期待與你們一同創造出充滿魔力的音樂體驗，讓每一位聽眾都能沉浸在音樂的海洋中，一同感受音符的力量！
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
            background: url(<path-to-image>),
              lightgray -26.448px -3.114px / 132.653% 100% no-repeat;
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
              margin-bottom:20px;


              .user-info-item {           
                display: block;
              }

              .user-info-item-info {
                display: block;
          }
          }
        }
        /*------------- RWD  ----------- */
      `}</style>
    </>
  )
}
