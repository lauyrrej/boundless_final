import { useEffect, useState, useRef} from 'react'
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
import { FaHeart } from 'react-icons/fa'

import Card from '@/components/lesson/lesson-card'
import HoriCard from '@/components/lesson/lesson-card-hori'
import ProductCard from '@/components/lesson/lesson-productbrief-card'

//試抓資料區
import Lesson from '@/data/Lesson.json'
//toast
import React from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-hot-toast'
import App from '@/pages/_app'

export default function LessonDetailPage() {
  // -------試抓資料區----------
  //   console.log(Lesson)

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

  //收藏按鍵的功能
  //會有兩個狀態 連結會員資料 已經按過讚的收回;沒按過的按讚
  const [colorChange, setcolorChange] = useState(false)
  const colorToggle = () => {
    //按按鍵切換狀態
    setcolorChange(!colorChange)
  }
  // ----------------------加入右上角購物車的功能  ----------------------

  //FIXME
  // ReactDOM.render(
  //   <React.StrictMode>
  //     <ToastProvider>
  //       <App />
  //     </ToastProvider>
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // )

  //-----------------------動態路由
  //  由router中獲得動態路由(屬性名稱pid，即檔案[pid].js)的值，router.query中會包含pid屬性
  // 1. 執行(呼叫)useRouter，會回傳一個路由器
  // 2. router.isReady(布林值)，true代表本元件已完成水合作用(hydration)，可以取得router.query的值
  const router = useRouter()

  const [LessonDetail, setLessonDetail] = useState()
 const prevLidRef = useRef(null)
  // 向伺服器要求資料，設定到狀態中用的函式
  const getLessonDetail = async (lid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/lesson/${lid}`)

      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()

      console.log(data)

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型有值，以避免錯誤
      if (data) {
        setLessonDetail(data)
        console.log(LessonDetail[0].name)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 初次渲染"之後(After)"+router.isReady改變時，執行其中程式碼
  useEffect(() => {
    // 如果isReady是true，確保能得到query的值
    if (router.isReady) {
      const { lid } = router.query
      console.log(lid)
      // 如果lid與上一次的不同，觸發getLessonDetail
      if (lid !== prevLidRef.current) {
        getLessonDetail(lid)
        prevLidRef.current = lid
      }
    }
  }, [router.isReady])

  console.log('render')
  console.log(router.query, ' isReady=', router.isReady)
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
          <div className="breadcrumb-wrapper" style={{ paddingBlock: '20px' }}>
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <Link href="/lesson/lesson-data">
                <li style={{ marginLeft: '8px' }}>探索課程</li>
              </Link>
              <FaChevronRight />

              {LessonDetail && LessonDetail.length > 0 && (
                <li style={{ marginLeft: '10px' }}>
                  {LessonDetail[0].lesson_category_id}
                </li>
              )}
            </ul>
          </div>
          <div className="col-12 col-sm-6">
            {/* 主內容 */}
            <main className="content">
              <div className="Left">
                {/* prodBriefingArea */}
                <div className="prodBriefingArea d-flex">
                  {LessonDetail && LessonDetail.length > 0 && (
                    <img
                      src={`/課程與師資/lesson_img/${LessonDetail[0].img}`}
                      className="prodImg"
                    />
                  )}
                </div>
                {/* 手機版productbrief-card放這 */}
                <div className="Right-mobile">
                  <div className="prodBriefing sticky-top">
                    {LessonDetail && LessonDetail.length > 0 && (
                      <div className="prodMainName">
                        {LessonDetail[0].name}Logic Pro X 從零開始
                      </div>
                    )}

                    <div className="Rating">
                      <div className="star">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?"
                          className="starImg"
                        />
                        <div className="ratingNumber">4.9</div>
                        <div className="commentNumber">(10)</div>
                      </div>
                      <div className="sales">購買人數 50</div>
                    </div>
                    <div className="productPrice">
                      <div className="price">NT$ 1,800</div>
                      <div className="likesIcon icon-container ">
                        <FaHeart
                          className="likesIcon"
                          size="32px"
                          style={{ color: `${colorChange ? 'red' : ''}` }}
                          onClick={colorToggle}
                        />
                      </div>
                      {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed2e715f1421a33de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?"
                        className="likesIcon"
                        style={{ color: `${colorChange ? 'red' : ''}` }}
                        onClick={colorToggle}
                      /> */}
                    </div>
                    <div className="lengthHomeworkArea">
                      <div className="lengthhomework">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/81a1d10e78e821775737fe4938ae726e8de4a80804b01bdda9876d9f86f9b1bb?"
                          className="lengthIcon"
                        />
                        <div className="lengthHomeworkWord">5小時</div>
                      </div>
                      <div className="lengthhomework">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4552b4fc37047176a87577807414005cf8e8466b4ef23329066c1c39e5dad447?"
                          className="img-10"
                        />
                        <div className="lengthHomeworkWord">1份作業</div>
                      </div>
                    </div>
                    <div className="lessonIntro">
                      Logic Pro
                      為數位音樂編曲入門的必學軟體，從錄音、編曲到混音一次包辦，帶你認識錄音介面、多重效果器，以及豐富的內建素材庫，是對音樂創作有興趣的你不可錯過的專業音樂編曲課程。
                    </div>
                  </div>
                </div>

                {/*商品細節 */}
                <div className="detail">
                  {/* 單元一覽 */}
                  <div className="outline detail-wrapp  mt40">
                    <div className="detail-title">單元一覽</div>
                    <div className="list">
                      {LessonDetail && LessonDetail.length > 0 && (
                        <ul>
                          {LessonDetail[0].outline}
                          //FIXME做斷行
                          <li>Logic Pro X 從零開始</li>
                          <li>正式課程開始</li>
                          <li>編曲Arrange</li>
                          <li>數位錄音Recording</li>
                          <li>混音Mixing</li>
                          <li>專題課程</li>
                          <li>【 iPad 版】Logic Pro</li>
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* 適合對象 */}
                  <div className="suitable   mt40">
                    <div className="detail-title">適合對象</div>
                    <div className="list">
                      {LessonDetail && LessonDetail.length > 0 && (
                        <ul>
                          {LessonDetail[0].suitable}
                          <li>本身熱愛音樂，但從沒機會學習過。</li>
                          <li>
                            會至少一樣樂器，但不會音樂製作，想學錄音編曲和混音。
                          </li>
                          <li>
                            本身有接觸過數位音樂，但沒使用過 Logic Pro X。
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* 你將學到 */}
                  <div className="achievement  -secondary mt40">
                    <div className="detail-title">你將學到</div>
                    <div className="list">
                      {LessonDetail && LessonDetail.length > 0 && (
                        <ol>
                          {LessonDetail[0].achievement}
                          <li>
                            用Logic Pro X 獨立完成一首或更多首屬於自己的音樂。
                          </li>
                          <li>
                            了解音樂製作完整的步驟流程，若有興趣可再專精音樂方面的造詣。
                          </li>
                        </ol>
                      )}
                    </div>
                  </div>
                  {/* 學員回饋 */}
                  <div className="reviews  -secondary mt40">
                    <div className="detail-title">學員回饋</div>
                    <div className="list">
                      <div className="review">
                        <div className="review-area">
                          <div className="review-title">
                            <img
                              loading="lazy"
                              srcSet="..."
                              className="review-avatar"
                            />
                            <div className="review-user">
                              <div className="review-Name">
                                <div className="user-Name">John Mayer</div>
                                <div className="review-Date">2024-01-25</div>
                              </div>
                              <div className="review-Star">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="review-content">
                            初次見到這套軟體 全是英文 完全不知從何下手
                            去Youtube上查了很多教學影片 也去網路上搜了各種資料
                            還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                            就進到Ｈahow這網站裡買下了第一堂課
                            原本只是想了解Logic的基本操作
                            沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                            非常期待上完這堂課以後能做出什麼樣作品
                            我會繼續力學習的！！非常感謝老師開這堂課！！
                          </div>
                          <div className="comment-Like">
                            <div className="comment-Like-Number">
                              1人覺得有幫助
                            </div>
                            <div className="comment-Like-Icon">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                className="comment-like-icon-img"
                              />
                              <div className="comment-Like-Word">有幫助</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review">
                        <div className="review-area">
                          <div className="review-title">
                            <img
                              loading="lazy"
                              srcSet="..."
                              className="review-avatar"
                            />
                            <div className="review-user">
                              <div className="review-Name">
                                <div className="user-Name">John Mayer</div>
                                <div className="review-Date">2024-01-25</div>
                              </div>
                              <div className="review-Star">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="review-content">
                            初次見到這套軟體 全是英文 完全不知從何下手
                            去Youtube上查了很多教學影片 也去網路上搜了各種資料
                            還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                            就進到Ｈahow這網站裡買下了第一堂課
                            原本只是想了解Logic的基本操作
                            沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                            非常期待上完這堂課以後能做出什麼樣作品
                            我會繼續力學習的！！非常感謝老師開這堂課！！
                          </div>
                          <div className="comment-Like">
                            <div className="comment-Like-Number">
                              1人覺得有幫助
                            </div>
                            <div className="comment-Like-Icon">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                className="comment-like-icon-img"
                              />
                              <div className="comment-Like-Word">有幫助</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review">
                        <div className="review-area">
                          <div className="review-title">
                            <img
                              loading="lazy"
                              srcSet="..."
                              className="review-avatar"
                            />
                            <div className="review-user">
                              <div className="review-Name">
                                <div className="user-Name">John Mayer</div>
                                <div className="review-Date">2024-01-25</div>
                              </div>
                              <div className="review-Star">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                  className="img-13"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="review-content">
                            初次見到這套軟體 全是英文 完全不知從何下手
                            去Youtube上查了很多教學影片 也去網路上搜了各種資料
                            還是不知道該從何著手。不過還好有在Youtu上看到這門課的宣傳影片
                            就進到Ｈahow這網站裡買下了第一堂課
                            原本只是想了解Logic的基本操作
                            沒想到竟然連簡單的編曲技術也學會了（目前剛上完第三章）受益良多！！
                            非常期待上完這堂課以後能做出什麼樣作品
                            我會繼續力學習的！！非常感謝老師開這堂課！！
                          </div>
                          <div className="comment-Like">
                            <div className="comment-Like-Number">
                              1人覺得有幫助
                            </div>
                            <div className="comment-Like-Icon">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b33573d1006caa2dd045129e591ff98dd975245bb9b1f9ad55c74a65c6a47d58?"
                                className="comment-like-icon-img"
                              />
                              <div className="comment-Like-Word">有幫助</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="more-review">
                        <div className="more-review-word">更多回饋</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0121670ff626339b824728641b333ff15c591ace8f84c9c919e13179e8adc237?"
                          className="img-33"
                        />
                      </div>
                    </div>
                  </div>
                  {/* 講師資訊 */}
                  <div className="teacher-info  -secondary mt40">
                    <div className="detail-title">講師資訊</div>
                    <div className="teacher-info-area">
                      <div className="teacher-img-con ">
                        {LessonDetail && LessonDetail.length > 0 && (
                          <img
                            loading="lazy"
                            src="/課程與師資/teacher_img/teacher_001.jpeg"
                            className="teacherImg"
                          />
                        )}
                      </div>
                      <div className="teacher-info-word">
                        <div className="teacher-name">徐歡CheerHsu</div>
                        <div className="teacher-info-detail">
                          本身為全職的音樂工作者，也是
                          Youtuber「倆倆」的音樂影片製作人，擁有近百支以上音樂的
                          MV 製作經驗，在2017曾創下台灣 Youtube
                          熱門創作者影片的第四名，本身頻道總點閱率也達到一千五百萬成績。對於這方面的學習從不間斷，且已將音樂融入為生活習慣。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/*   ----------------------頁面內容 右半部---------------------- */}
          <div className="d-none d-sm-block col-sm-6 page-control">
            {LessonDetail && LessonDetail.length > 0 && (
              <ProductCard
                className="Right-card"
                name={LessonDetail[0].name}
                homework={LessonDetail[0].homework}
                sales={LessonDetail[0].sales}
                price={LessonDetail[0].price}
                length={LessonDetail[0].length}
                info={LessonDetail[0].info}
              />
            )}
          </div>
        </div>
        {/* 猜你喜歡 */}
        <div className="you-will-like">
          <div className="detail-title ">猜你喜歡...</div>
          <div className="card-con">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="you-will-like-mobile">
          <div className="detail-title ">猜你喜歡...</div>
          {/* 手機版card-con */}
          <div className="card-con-mobile">
            <HoriCard />
            <HoriCard />
            <HoriCard />
          </div>
        </div>
      </div>
      <div className="shoppingBtn sticky-top" id="shoppingBtn">
        <div className="cartBtn">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c240e4bc8653fe6179383ea22f1eb80902c70eec255a944e9d8e0efbf823c4e3?"
            className="cartIcon"
          />
          <div className="cart">加入購物車</div>
        </div>
        <div className="buyBtn">
          <div className="buy">立即購買</div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        * {
          box-sizing: -box;
        }
        :root {
          --primary: #1581cc;
          --light-primary: #18a1ff;
          --deep-primary: #124365;
          --dark: #1d1d1d;
          --secondary: #5a5a5a;
          --body: #b9b9b9;
          --yellow: #faad14;
          --red: #ec3f3f;
        }

        body {
          font-family: 'Noto Sans TC', sans-serif;

          & ul {
            list-style: none;
            margin: 0;
          }

          & a {
            text-decoration: none;
          }
        }

        /* --------------- header & navbar --------------- */
        header {
          background-color: var(--primary);
          height: 60px;
          padding: 10px 35px;
          .logo {
            max-width: 180px;
          }
          .logo-mb {
            max-width: 30px;
          }

          @media screen and (max-width: 576px) {
            padding-inline: 20px;
          }
        }

        nav {
          flex: 1;
          max-width: 660px;
        }

        nav a {
          display: block;
          padding: 5px 12px;
          -radius: 10px;
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          &:hover {
            color: var(--deep-primary);
            background-color: #fff;
          }
        }

        .navbar-mb {
          color: #fff;
        }

        /* --------------- container --------------- */
        .container {
          min-height: calc(100vh);
        }
        .breadcrumb-wrapper {
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              color: #1581cc;
            }
        }

        /* prodBriefingArea */
        .prodBriefingArea{
             width: 660px;
          height: 394px;
            padding:0px;
            border-radius: 10px;
            overflow: hidden; 
        }
        .prodImg {
            padding:0px;
         
          background-color: #ff9595;
          border-radius: 10px;
         
          
        }

        .mt-60 {
          margin-top: 60px;
        }

        /* ------------------ */

        /* 課程細節 */
        .mt40 {
          margin-top: 40px;
        }

        /* detail共用 */
        .detail{
            max-width:100%;
        }
        .detail-title {
          color: var(--primary-deep, #0d3652);
          font: 700 24px Noto Sans TC, sans-serif;
        }

        .list {
          background-color: rgba(185, 185, 185, 0.3);
          padding:8px 12px;
        }

        .outline {
          {/* height: 243px;
          width: 660px; */}
        }

        .outline ul{
list-style-type: disc; 
        }

        .suitable {
          {/* height: 130px;
          width: 660px; */}
        }
        .achievement {
          {/* height: 107px;
          width: 660px; */}
        }
        .review-title {
          display: flex;
        }
        .review-avatar {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 44px;
          : 1px solid black;
          -radius: 50%;
        }
        .review-Name {
          display: flex;
          gap: 10px;
        }
        .comment-Like {
          display: flex;
          justify-content: end;
          gap: 5px;
        }
         .comment-Like-Icon {
          display: flex;
          border-radius: 3px;
          border: 1px solid #1581cc;
          gap: 4px;
        }
        .more-review {
          justify-content: end;
          display: flex;
          margin-right: 20px;
          margin-block: 10px;
          gap: 9px;
          font-size: 16px;
          color: var(--primary, #1581cc);
          font-weight: 700;
          padding: 4px 0 4px 80px;
        }
        .teacher-info {
          {/* height: 217px;
          width: 660px; */}
        }
        .teacher-info-area {
          display: flex;
          {/* height: 166px;
          width: 660px; */}
        }
        .teacher-img-con {
          width: 140px;
          height: 140px;
        }
        .teacherImg {
          width: 100%;
          height: auto;
          object-fit: cover;
          overflow: auto;
        }
        .teacher-info-word {
          width: 77%;
        }

.page-control{
    
            
}
    

        /* ------------- */

        .you-will-like {
          {/* height: 508px; */}
          width: 100%;
          margin-top: 30px;
        }
        .card-con{
            padding:0;
            display:flex;
            justify-content:space-between;
            
        }
        .card-con-mobile{
            display:block;
//TODO
        }
        .Right-mobile{
            display:none;
        }
        .you-will-like-mobile{
            display:none;
        }
        .shoppingBtn{
             display:none;
        }
        /* --------------- footer --------------- */





        {/* -----------RWD-------------*/}
        @media screen and (max-width:576px) {

  .breadcrumb-wrapper {
margin-bottom:0px;
  }
  .Right{
    display:none;
  }
  {/* 手機版productbrief-card */}
                        .prodBriefingArea{
    width:100%;
    height:204px;
}
                        .prodImg {
            padding:0px;
         
          background-color: #ff9595;
          border-radius: 10px;
          height:204px;
          
        }
       
                        .Right-mobile{
display:block;
  }
                        .prodBriefing {
                        /* background-color: #ff9595; */
                        {/* margin-left: 110px; */}
                        margin-top: 20px;
                      }
                      .prodMainName {
                        color: var(--dark, #1d1d1d);
                        /* font: 700 40px Noto Sans TC, sans-serif; */
                        font-weight: 700;
                        font-size: 40px;
                      }
                      /*  */
                      .font-family {
                        font-family: Noto Sans TC, sans-serif;
                      }
                      /*  */

                      .Rating {
                        justify-content: space-between;
                        display: flex;
                        margin-top: 10px;
                        width: 100%;
                        gap: 20px;
                        font-weight: 400;
                      }

                      .star {
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        gap: 10px;
                        white-space: nowrap;
                      }

                      .ratingNumber {
                        color: var(--yellow, #faad14);
                        align-self: stretch;
                        font: 24px Noto Sans TC, sans-serif;
                      }

                      .commentNumber {
                        color: var(--body, #b9b9b9);
                        align-self: stretch;
                        flex-grow: 1;
                        margin: auto 0;
                        font: 16px Noto Sans TC, sans-serif;
                      }
                      .sales {
                        color: var(--secondary, #5a5a5a);
                        margin: auto 0;
                        font: 16px Noto Sans TC, sans-serif;
                      }
                      .productPrice {
                        justify-content: space-between;
                        align-items:center;
                        display: flex;
                        margin-top: 10px;
                        gap: 20px;
                      }
                      .price {
                        color: var(--dark, #1d1d1d);
                        white-space: nowrap;
                        padding: 9px 21px 2px 0;
                        font: 700 28px Noto Sans TC, sans-serif;
                      }
                      .likesIcon {
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                        border: 1px solid var(--body, #b9b9b9);
                        display: flex;
                        aspect-ratio: 1;
                        width: 34px;
                        height: 34px;
                        margin: auto 0;
                        padding: 0 7px;
                      }
                      .likesIcon :hover {
                        background-color: #ffc0cb;
                      }
                      .lengthHomeworkArea {
                        display: flex;
                      }
                      .lengthhomework {
                        justify-content: space-between;
                        display: flex;
                        gap: 5px;
                      }

                      .lengthHomeworkWord {
                        font-family: Noto Sans TC, sans-serif;
                        flex-grow: 1;
                      }
                      .lessonIntro {
                      }

                      .container{
                        padding-bottom: 20px;
                      }
                      .shoppingBtn {
                        display: flex;
                        {/* margin-top: 20px; */}
                        justify-content: space-evenly;
                        gap: 12px;
                        font-size: 16px;
                        color: var(--white, #fff);
                        font-weight: 700;
                       
                         bottom: 0;
                        left: 0;
                        width: 100%;
                        background-color:white;
                        padding-bottom:5px;
                        padding: 26px 0px 30px 0px;
                        z-index:1200;
                      }

                      .cartBtn {
                        display: flex;
                        justify-content: center;
                        border-radius: 5px;
                        background-color: var(--body, #b9b9b9);
                        gap: 12px;
                        padding: 8px ;
                        margin-left:5px;
                        width: 100%;
                      }
                   
                      .buyBtn {
                        display: flex;
                        justify-content: center;
                        border-radius: 5px;
                        background-color: #18a1ff;
                        gap: 12px;
                        padding: 8px ;
                        margin-right:5px;
                        width: 100%;
                      }
                   
                      {/* ---------- */}

                      {/* detail-mobile */}
                      .detail{
max-width:100%;
                      }
                        //FIXME
                      .review-content{
                        max-width:100%;
                       word-wrap: break-word;
  overflow-wrap: break-word;

  
                      }
                      .you-will-like{
                       display:none;
}
//FIXME
.you-will-like-mobile{
    display:block;
}
.card-con-mobile{
    display:block;
}
                      //FIXME
                   
}
    
      `}</style>
    </>
  )
}
