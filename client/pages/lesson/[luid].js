import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa'

import Card from '@/components/lesson/lesson-card-data'
import HoriCard from '@/components/lesson/lesson-card-hori'
//右半部
import ProductCard from '@/components/lesson/lesson-productbrief-card'

//toast
import toast, { Toaster } from 'react-hot-toast'

// 購物車hook
import { useCart } from '@/hooks/use-cart'

export default function LessonDetailPage() {
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

  const { addLessonItem } = useCart()

  //-----------------------動態路由
  //  由router中獲得動態路由(屬性名稱pid，即檔案[pid].js)的值，router.query中會包含pid屬性
  // 1. 執行(呼叫)useRouter，會回傳一個路由器
  // 2. router.isReady(布林值)，true代表本元件已完成水合作用(hydration)，可以取得router.query的值
  const router = useRouter()

  const [LessonDetail, setLessonDetail] = useState()

  // 向伺服器要求資料，設定到狀態中用的函式
  const getLessonDetail = async (luid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/lesson/${luid}`)

      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()

      console.log(data)

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型有值，以避免錯誤
      if (data) {
        setLessonDetail(data)
        console.log(LessonDetail.product_review[0].user_img)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 初次渲染"之後(After)"+router.isReady改變時，執行其中程式碼
  useEffect(() => {
    // 如果isReady是true，確保能得到query的值
    if (router.isReady) {
      const { luid } = router.query
      console.log(luid)
      getLessonDetail(luid)
    }
  }, [router.isReady])

  console.log('render')

  console.log(router.query, ' isReady=', router.isReady)


  const notify = () => toast('{LessonDetail.data[0].name}已加入購物車.')


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
          <div
            className="breadcrumb-wrapper-ns"
            style={{ paddingBlock: '20px' }}
          >
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <Link href="/lesson">
                <li style={{ marginLeft: '8px' }}>探索課程</li>
              </Link>
              <FaChevronRight />

              {LessonDetail && LessonDetail.data.length > 0 && (
                <li style={{ marginLeft: '10px' }}>
                  {LessonDetail.data[0].lesson_category_name}
                </li>
              )}
            </ul>
          </div>
          <div className="col-12 col-sm-6">
            {/* 主內容 */}
            <main className="content">
              <div>
                <div className="Left">
                  {/* Product Briefing Area */}
                  <div className="prodBriefingArea d-flex">
                    {LessonDetail && LessonDetail.data.length > 0 && (
                      <img
                        src={`/課程與師資/lesson_img/${LessonDetail.data[0].img}`}
                        className="prodImg"
                        alt="Lesson Preview"
                      />
                    )}
                  </div>

                  {/* Mobile version product brief card */}
                  <div className="Right-mobile">
                    <div className="prodBriefing sticky-top">
                      {LessonDetail && LessonDetail.data.length > 0 && (
                        <div className="prodMainName">
                          {LessonDetail.data[0].name} Logic Pro X 從零開始
                        </div>
                      )}

                      <div className="Rating">
                        <div className="star">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?"
                            className="starImg"
                            alt="Star Rating"
                          />
                          <div className="ratingNumber">4.9</div>
                          <div className="commentNumber">(10)</div>
                        </div>
                        <div className="sales">購買人數 50</div>
                      </div>

                      <div className="productPrice">
                        <div className="price">NT$ 1,800</div>
                        <div className="likesIcon icon-container">
                          <FaHeart
                            className="likesIcon"
                            size="32px"
                            style={{ color: `${colorChange ? 'red' : ''}` }}
                            onClick={colorToggle}
                          />
                        </div>
                      </div>

                      <div className="lengthHomeworkArea">
                        <div className="lengthhomework">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/81a1d10e78e821775737fe4938ae726e8de4a80804b01bdda9876d9f86f9b1bb?"
                            className="lengthIcon"
                            alt="Course Length"
                          />
                          <div className="lengthHomeworkWord">5小時</div>
                        </div>
                        <div className="lengthhomework">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4552b4fc37047176a87577807414005cf8e8466b4ef23329066c1c39e5dad447?"
                            className="img-10"
                            alt="Homework"
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

                  {/* Product Details */}
                  <div className="detail">
                    {/* Unit Overview */}
                    <div className="outline detail-wrapp mt40">
                      <div className="detail-title">單元一覽</div>
                      <div className="list">
                        <ul>
                          {LessonDetail &&
                            LessonDetail.data.length > 0 &&
                            LessonDetail.data[0].outline
                              .split('\n')
                              .map((line, index) => (
                                <li key={index}>{line}</li>
                              ))}
                        </ul>
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div className="suitable mt40">
                      <div className="detail-title">適合對象</div>
                      <div className="list">
                        <ul>
                          {LessonDetail &&
                            LessonDetail.data.length > 0 &&
                            LessonDetail.data[0].suitable
                              .split('\n')
                              .map((line, index) => (
                                <li key={index}>{line}</li>
                              ))}
                        </ul>
                      </div>
                    </div>

                    {/* What You Will Learn */}
                    <div className="achievement mt40">
                      <div className="detail-title">你將學到</div>
                      <div className="list">
                        <ul>
                          {LessonDetail &&
                            LessonDetail.data.length > 0 &&
                            LessonDetail.data[0].achievement
                              .split('\n')
                              .map((line, index) => (
                                <li key={index}>{line}</li>
                              ))}
                        </ul>
                      </div>
                    </div>

                    {/* Student Feedback */}
                    <div className="reviews mt40">
                      <div className="detail-title">學員回饋</div>
                      <div className="list">
                        {/* Comments */}
                        {LessonDetail &&
                          LessonDetail.product_review.length > 0 &&
                          LessonDetail.product_review.map((review, index) => (
                            <div className="review" key={index}>
                              {/* Review Content */}
                              <div className="review-area">
                                <div className="review-title">
                                  <img
                                    loading="lazy"
                                    src={`/新增資料夾/user/${LessonDetail.product_review[index].img}`}
                                    className="review-avatar"
                                    alt="User"
                                  />
                                  <div className="review-user">
                                    <div className="review-Name">
                                      {LessonDetail.product_review[index].name}
                                      <div className="review-Date">
                                        {
                                          LessonDetail.product_review[index]
                                            .created_time
                                        }
                                      </div>
                                    </div>
                                    <div className="review-Star">
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                        className="review-star-img"
                                      />
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                        className="review-star-img"
                                      />
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                        className="review-star-img"
                                      />
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                        className="review-star-img"
                                      />
                                      <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8fdbe9fe0ec2e2c0415ca248a5486136ce3b7792c4e42b9c5f42d0e78c89a5?"
                                        className="review-star-img"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="review-content">
                                  {LessonDetail.product_review[index].content}
                                </div>
                              </div>

                              <div className="comment-Like">
                                <div className="comment-Like-Number">
                                  {LessonDetail.product_review[index].likes}{' '}
                                  人覺得有幫助
                                </div>
                                {/* Like Icon */}
                              </div>
                            </div>
                          ))}
                      </div>
                      {/* More Button */}
                      <div className="more-review">
                        <div className="more-review-word">更多回饋</div>
                        {/* Icon */}
                      </div>
                    </div>
                  </div>
                  {/* Instructor Information */}
                  <div className="teacher-info mt40">
                    <div className="detail-title">講師資訊</div>
                    <div className="teacher-info-area">
                      <div className="teacher-img-con">
                        {LessonDetail && LessonDetail.data.length > 0 && (
                          <img
                            loading="lazy"
                            src="/課程與師資/teacher_img/teacher_001.jpeg"
                            className="teacherImg"
                            alt="Teacher"
                          />
                        )}
                      </div>
                      <div className="teacher-info-word">
                        <div className="teacher-name">徐歡CheerHsu</div>
                        <div className="teacher-info-detail">
                          本身為全職的音樂工作者，也是Youtuber「倆倆」的音樂影片製作人，擁有近百支以上音樂的MV製作經驗，在2017曾創下台灣Youtube熱門創作者影片的第四名，本身頻道總點閱率也達到一千五百萬成績。對於這方面的學習從不間斷，且已將音樂融入為生活習慣。
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
            {LessonDetail && LessonDetail.data.length > 0 && (
              <ProductCard
                className="Right-card"
                id={LessonDetail.data[0].id}
                img={LessonDetail.data[0].img}
                img_small={LessonDetail.data[0].img}
                type={LessonDetail.data[0].type}
                lesson_category_id={LessonDetail.data[0].lesson_category_id}
                name={LessonDetail.data[0].name}
                homework={LessonDetail.data[0].homework}
                sales={LessonDetail.data[0].sales}
                price={LessonDetail.data[0].price}
                discount={LessonDetail.data[0].discount}
                discount_state={LessonDetail.data[0].discount_state}
                length={LessonDetail.data[0].length}
                info={LessonDetail.data[0].info}
                onshelf_time={LessonDetail.data[0].onshelf_time}
                addLessonItem={addLessonItem}
              />
            )}
          </div>
        </div>
        {/* 猜你喜歡 */}
        <div className="you-will-like">
          <div className="detail-title ">猜你喜歡...</div>
          <div className="card-con">
            {LessonDetail &&
              LessonDetail.youwilllike &&
              LessonDetail.youwilllike
                .sort((a, b) => b.sales - a.sales) // Sort courses based on sales volume
                .slice(0, 5) // Get top 5 courses
                .map((v, i) => (
                  <Card
                    key={i}
                    id={v.id}
                    luid={v.puid}
                    name={v.name}
                    price={v.price}
                    teacher_id={v.teacher_id}
                    img={v.img}
                    length={v.length}
                    sales={v.sales}
                  />
                ))}
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
        <div
          className="cartBtn"
          onClick={() => {
            addLessonItem(v)
            notify()
          }}
        >
          <Toaster />
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
        .prodBriefingArea {
          width: 660px;
          height: 394px;
          padding: 0px;
          border-radius: 10px;
          overflow: hidden;
        }
        .prodImg {
          padding: 0px;

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
        .detail {
          max-width: 100%;
        }
        .detail-title {
          color: var(--primary-deep, #0d3652);
          font: 700 24px Noto Sans TC, sans-serif;
          margin-bottom: 16px;
        }

        .list {
          background-color: rgba(185, 185, 185, 0.3);
          padding: 8px 12px;
        }

        .outline {
           {
            /* height: 243px;
          width: 660px; */
          }
        }
        .outline ul,
        .suitable ul {
          list-style-type: disc;
        }
        .review-user {
          margin-left: 10px;
        }
        .review-title {
          display: flex;
        }
        .review-avatar {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 44px;
          high: 44px;
          border: 1px solid black;
          border-radius: 44px;
        }
        .review-Name {
          display: flex;
          color: var(--primary-deep, #124365);
          font-family: 'Noto Sans TC';
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          gap: 10px;
        }

        \ .comment-Like {
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
           {
            /* height: 217px;
          width: 660px; */
          }
        }
        .teacher-info-area {
          display: flex;
           {
            /* height: 166px;
          width: 660px; */
          }
        }
        .teacher-img-con {
          width: 140px;
          height: 140px;
          margin: 8px 16px 8px 12px;
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

        .page-control {
        }

        /* ------------- */

        .you-will-like {
           {
            /* height: 508px; */
          }
          width: 100%;
          margin-top: 30px;
        }
        .card-con {
          padding: 0;
          display: flex;
          justify-content: space-between;
        }
        .card-con-mobile {
          display: block;
          //TODO
        }
        .Right-mobile {
          display: none;
        }
        .you-will-like-mobile {
          display: none;
        }
        .shoppingBtn {
          display: none;
        }
        /* --------------- footer --------------- */

         {
          /* -----------RWD-------------*/
        }
        @media screen and (max-width: 576px) {
          .breadcrumb-wrapper {
            margin-bottom: 0px;
          }
          .Right {
            display: none;
          }
           {
            /* 手機版productbrief-card */
          }
          .prodBriefingArea {
            width: 100%;
            height: 204px;
          }
          .prodImg {
            padding: 0px;

            background-color: #ff9595;
            border-radius: 10px;
            height: 204px;
          }

          .Right-mobile {
            display: block;
          }
          .prodBriefing {
            /* background-color: #ff9595; */
             {
              /* margin-left: 110px; */
            }
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
            align-items: center;
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

          .container {
            padding-bottom: 20px;
          }
          .shoppingBtn {
            display: flex;
             {
              /* margin-top: 20px; */
            }
            justify-content: space-evenly;
            gap: 12px;
            font-size: 16px;
            color: var(--white, #fff);
            font-weight: 700;

            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            padding-bottom: 5px;
            padding: 26px 0px 30px 0px;
            z-index: 1200;
          }

          .cartBtn {
            display: flex;
            justify-content: center;
            border-radius: 5px;
            background-color: var(--body, #b9b9b9);
            gap: 12px;
            padding: 8px;
            margin-left: 5px;
            width: 100%;
          }

          .buyBtn {
            display: flex;
            justify-content: center;
            border-radius: 5px;
            background-color: #18a1ff;
            gap: 12px;
            padding: 8px;
            margin-right: 5px;
            width: 100%;
          }

           {
            /* ---------- */
          }

           {
            /* detail-mobile */
          }
          .detail {
            max-width: 100%;
          }
          //FIXME
          .review-content {
            max-width: 100%;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          .you-will-like {
            display: none;
          }
          //FIXME
          .you-will-like-mobile {
            display: block;
          }
          .card-con-mobile {
            display: block;
          }
          //FIXME
        }
      `}</style>
    </>
  )
}
