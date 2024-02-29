/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import avatar from '@/public/user/Meiyuyu.jpg'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import ArticleCard from '@/components/article/article-card'

export default function Test() {
  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

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
          <div className="col-12">
            {/* 麵包屑 */}
            <div
              className="breadcrumb-wrapper-ns"
              style={{ paddingBlock: '20px 30px' }}
            >
              <ul className="d-flex align-items-center p-0 m-0">
                <IoHome size={20} />
                <li style={{ marginLeft: '8px' }}>棉悠悠的個人首頁</li>
                {/* <FaChevronRight />
                <Link href="/jam/recruit-list">
                  <li style={{ marginLeft: '10px' }}>團員募集</li>
                </Link>

                <FaChevronRight />
                <li style={{ marginLeft: '10px' }}>JAM 資訊</li> */}
              </ul>
            </div>
            {/* 主內容 */}
            <main className="content">
              <div className="container custom-container">
                <div className="row">
                  <div className="col-lg-3 col-sm-12">
                    <div className="user-homePage-sideWarp">
                      <div className="user-homePage-content-left">
                        <div className="user-homePage-topInfo">
                          <div className="user-homePage-avatar">
                            <Image className="avatar" src={avatar} alt="" />
                          </div>
                          <div className="user-homePage-name">棉悠悠</div>
                          <div className="user-homePage-bandName">
                            PalWorld樂團
                          </div>
                        </div>
                        <div className="user-homePage-Info">
                          <div className="user-homePage-Info-title">
                            會員資訊
                          </div>
                          <div className="user-homePage-Info-list">
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                暱稱：
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  棉悠悠
                                </div>
                              </div>
                            </div>
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                性別：
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  男
                                </div>
                              </div>
                            </div>
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                生日：
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  2024/01/19
                                </div>
                              </div>
                            </div>
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                喜歡曲風：
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  金屬、搖滾
                                </div>
                              </div>
                            </div>
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                演奏樂器：
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  貝斯
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="user-homePage-Info contactInfo">
                          <div className="user-homePage-Info-title">
                            聯絡方式
                          </div>
                          <div className="user-homePage-Info-list">
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                手機：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  0912456789
                                </div>
                              </div>
                            </div>
                            <div className="user-homePage-info-item">
                              <div className="user-homePage-info-item-titleText">
                                信箱：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              </div>
                              <div className="user-homePage-info-item-Content">
                                <div className="user-homePage-info-item-contentText">
                                  boundless@gmail.com
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-sm-12 user-homePage-content-right">
                    <div className="user-homePage-content-right-Info">
                      <div className="user-homePage-content-right-titleText">
                        自我介紹
                      </div>
                      <div className="user-homePage-content-right-infoText">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那個帕魯我已經觀察你很久了，我對你是有些失望的，進了這個營地，不是把事情做好就可以的，你需要有體系化思考的能力。
                        你做的事情，他的價值在哪裡？
                        你是否作出了壁壘，形成了核心競爭力？
                        你做的事情，和其他帕魯的差異化在哪裡？
                        為什麼是你來做，其他帕魯不能做嗎？
                        是否對得起你泡的這兩分鐘溫泉、吃的這兩顆莓果？
                        你要有自己的判斷力，不是我說什麼你才做什麼！
                        現在的年輕帕魯就是太年輕，工作量稍微大一點就憂鬱生病，你不干有得是帕魯幹，幹得不好能力差就會被優化掉。
                        我招你進來時為了讓你解決其他帕魯解決不了的問題的，你需要證明你的價值在哪裡！
                        你沒有緊迫感，一到時間就睡覺，別人新來的實習帕魯，通宵挖礦。
                        但我希望你再進步點，有壓力才有動力。
                      </div>
                      <div className="user-homePage-content-right-socialMedia"></div>
                    </div>
                    <div className="user-homePage-content-right-article">
                      <div className="user-homePage-content-right-article-titleText">
                        發表文章
                      </div>
                      <div className="user-homePage-content-right-article-cardList">
                        導入ArticleCard元件 爆版
                        {/* <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard /> */}
                        {/* <div className="user-homePage-content-right-article-card">
                        
                          <div className="user-homePage-content-right-article-card-articleInfo"></div>
                          <div className="user-homePage-content-right-article-card-content" />
                          <div className="user-homePage-content-right-article-card-viewsLike" />
                          <div className="user-homePage-content-right-article-card-kind-bookmark" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/*   ----------------------頁面內容  ---------------------- */}
          {/* <div className="d-none d-sm-block col-sm-4 page-control"></div> */}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        /* -----------------homePage------------------ */
        .custom-container {
          padding: 0;
        }
        .user-homePage-sideWarp {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          .user-homePage-content-left {
            display: flex;
            width: 330px;
            max-width: 330px;
            padding: 25px 0px;
            flex-direction: column;

            align-items: flex-start;
            border-radius: 10px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));

            .user-homePage-topInfo {
              display: flex;
              padding: 10px 0px;
              flex-direction: column;
              align-items: center;
              gap: 5px;
              align-self: stretch;
              border-radius: 15px;

              .user-homePage-avatar {
                display: flex;
                width: 150px;
                height: 150px;
                justify-content: center;
                align-items: center;

                .avatar {
                  width: 150px;
                  height: 150px;
                  flex-shrink: 0;
                  border-radius: 150px;
                  background: url(<path-to-image>),
                    lightgray 50% / cover no-repeat;
                }
              }

              .user-homePage-name {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 15px;
                color: var(--dark, #1d1d1d);
                text-align: center;

                /* h5 */
                font-family: 'Noto Sans TC';
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
              }

              .user-homePage-bandName {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                color: var(--dark, #1d1d1d);
                text-align: center;

                /* h5 */
                font-family: 'Noto Sans TC';
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
              }
            }
            .user-homePage-Info {
              display: flex;
              padding: 10px 19px;
              flex-direction: column;
              align-items: flex-start;
              gap: 20px;
              align-self: stretch;
              border-radius: 15px;

              .user-homePage-Info-title {
                color: var(--primary-deep, #124365);
                text-align: center;

                /* h3 */
                font-family: 'Noto Sans TC';
                font-size: 28px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
              }

              .user-homePage-Info-list {
                display: flex;
                padding: 0px 10px;
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;

                .user-homePage-info-item {
                  align-self: stretch;
                  justify-content: space-between;
                  align-items: flex-start;
                  display: inline-flex;
                }
                .user-homePage-info-item-titleText {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 10;
                  align-self: stretch;
                  overflow: hidden;
                  color: var(--primary-deep, #124365);
                  text-overflow: ellipsis;
                  font-family: 'Noto Sans TC';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                }
                .user-homePage-info-item-Content {
                  display: flex;
                  padding: 0px 10px;
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 16px;
                }
                .user-homePage-info-item-contentText {
                  display: -webkit-box;
                  width: 140px;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 10;
                  overflow: hidden;
                  color: var(--dark, #1d1d1d);
                  text-overflow: ellipsis;
                  word-wrap: break-word;
                  overflow-wrap: break-word;

                  /* p */
                  font-family: 'Noto Sans TC';
                  font-size: 16px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                }
              }
            }
          }
        }

        .user-homePage-content-right {
          display: flex;
          padding-left: 30px;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          gap: 20px;
          flex: 1 0 0;

          @media screen and (max-width: 576px) {
            padding-left: 0px;
          }

          .user-homePage-content-right-Info {
            width: 940px;
            display: flex;
            padding: 10px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            align-self: stretch;
            border-radius: 10px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));

            @media screen and (max-width: 576px) {
              width: 380px;
            }

            .user-homePage-content-right-titleText {
              color: var(--primary-deep, #124365);
              text-align: center;

              /* h3 */
              font-family: 'Noto Sans TC';
              font-size: 28px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }

            .user-homePage-content-right-infoText {
              align-self: stretch;
              color: #000;

              /* p */
              font-family: 'Noto Sans TC';
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }

          .user-homePage-content-right-article {
            display: flex;
            padding: 10px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            align-self: stretch;
            border-radius: 10px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));
            width: 940px;

            @media screen and (max-width: 576px) {
              width: 380px;
            }
            .user-homePage-content-right-article-titleText {
              color: var(--primary-deep, #124365);
              text-align: center;

              /* h3 */
              font-family: 'Noto Sans TC';
              font-size: 28px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }

            .user-homePage-content-right-article-cardList {
              display: flex;
              align-items: flex-start;
              align-content: flex-start;
              gap: 30px;
              align-self: stretch;
              flex-wrap: wrap;
              color: #000;

              .user-homePage-content-right-article-card {
                display: flex;
                height: 237.422px;
                min-width: 410px;
                max-width: 525px;
                padding: 6px 8px;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 10px;
                flex: 1 0 0;

                .user-homePage-content-right-article-card-articleInfo {
                  display: flex;
                  align-items: center;
                  gap: 16px;
                }

                .user-homePage-content-right-article-card-content {
                  display: flex;
                  justify-content: center;
                  align-items: flex-start;
                  gap: 8px;
                  align-self: stretch;
                }

                .user-homePage-content-right-article-card-viewsLike {
                  display: flex;
                  align-items: center;
                  gap: 20px;
                  align-self: stretch;
                }

                .user-homePage-content-right-article-card-kind-bookmark {
                  display: flex;
                  padding-right: 8px;
                  justify-content: space-between;
                  align-items: center;
                  align-self: stretch;
                }
              }
            }
          }
        }
      `}</style>
    </>
  )
}
