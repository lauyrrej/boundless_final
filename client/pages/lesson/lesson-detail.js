import React from 'react'

import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import { IoHome } from 'react-icons/io5'
import Card from '@/components/lesson/lesson-card'
import HoriCard from '@/components/lesson/lesson-card-hori'
import ProductCard from '@/components/lesson/lesson-productbrief-card'

export default function LessonDetail() {
  return (
    <>
      {/* header 頂部導覽列 */}
      <Navbar />

      {/* content */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {/* 麵包屑 */}
            <div className="breadcrumb-wrapper">
              <ul className="d-flex align-items-center p-0 m-0">
                <IoHome size={28} />
                <li style={{ marginLeft: '8px' }}>探索課程</li>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                </svg>
                <li style={{ marginLeft: '8px' }}>軟體操作</li>
              </ul>
            </div>
            {/* 包左右 */}
            <div className="d-flex">
              {/* 左半部 */}
              <div className="col-sm-6 Left">
                {/* prodBriefingArea */}
                <div className="prodBriefingArea d-flex">
                  <img
                    src="/課程與師資/lesson_img/lesson_005.jpeg"
                    alt=""
                    className="prodImg"
                  />
                </div>
                {/* 手機版productbrief-card放這 */}
                <div className="col-sm-6 Right-mobile">
                  <div className="prodBriefing  ">
                    <div className="prodMainName">Logic Pro X 從零開始</div>
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
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed2e715f1421a33de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?"
                        className="likesIcon"
                      />
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
                    <div className="shoppingBtn">
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
                  </div>
                </div>
                {/*----------------------*/}
                <div className="detail">
                  {/* 單元一覽 */}
                  <div className="outline detail-wrapp  mt40">
                    <div className="detail-title">單元一覽</div>
                    <div className="list">
                      <ul>
                        <li>Logic Pro X 從零開始</li>
                        <li>正式課程開始</li>
                        <li>編曲Arrange</li>
                        <li>數位錄音Recording</li>
                        <li>混音Mixing</li>
                        <li>專題課程</li>
                        <li>【 iPad 版】Logic Pro</li>
                      </ul>
                    </div>
                  </div>
                  {/* 適合對象 */}
                  <div className="suitable  -secondary mt40">
                    <div className="detail-title">適合對象</div>
                    <div className="list">
                      <ul>
                        <li>本身熱愛音樂，但從沒機會學習過。</li>
                        <li>
                          會至少一樣樂器，但不會音樂製作，想學錄音編曲和混音。
                        </li>
                        <li>本身有接觸過數位音樂，但沒使用過 Logic Pro X。</li>
                      </ul>
                    </div>
                  </div>
                  {/* 你將學到 */}
                  <div className="achievement  -secondary mt40">
                    <div className="detail-title">你將學到</div>
                    <div className="list">
                      <ol>
                        <li>
                          用Logic Pro X 獨立完成一首或更多首屬於自己的音樂。
                        </li>
                        <li>
                          了解音樂製作完整的步驟流程，若有興趣可再專精音樂方面的造詣。
                        </li>
                      </ol>
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
                        <img
                          loading="lazy"
                          src="/課程與師資/teacher_img/teacher_001.jpeg"
                          className="teacherImg"
                        />
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
              {/* 右半部 */}
              <ProductCard className="right" />
            </div>
          </div>
          {/* 猜你喜歡 */}
          <div className="col-sm-12 you-will-like  -secondary">
            <div className="detail-title ">猜你喜歡...</div>
            <div className="card-con">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
            <div className="card-con-mobile"><HoriCard/></div>
          </div>
        </div>
        <div> </div>
      </div>

      {/* End content */}
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
          margin-top: 80px;
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
          -radius: 3px;
          : 1px solid #1581cc;
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
        .Right-mobile{
            display:none;
        }
        /* --------------- footer --------------- */

        {/* RWD */}
        @media screen and (max-width:576px) {
  .Left {

  }
  .right{
    display:none;
  }
  {/* 手機版productbrief-card */}

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
                      .shoppingBtn {
                        display: flex;
                        {/* margin-top: 20px; */}
                        justify-content: space-evenly;
                        gap: 12px;
                        font-size: 16px;
                        color: var(--white, #fff);
                        font-weight: 700;

                         position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
                      }

                      .cartBtn {
                        display: flex;
                        justify-content: space-between;
                        border-radius: 5px;
                        background-color: var(--body, #b9b9b9);
                        gap: 12px;
                        padding: 8px 78px;
                      }
                      .cartBtn:hover {
                        background-color: #000000;
                      }
                      .buyBtn {
                        display: flex;
                        justify-content: space-between;
                        border-radius: 5px;
                        background-color: #18a1ff;
                        gap: 12px;
                        padding: 8px 78px;
                      }
                       .buyBtn:hover {
                        background-color: #000000;
                      }
                      {/* ---------- */}

                      {/* detail-mobile */}
                      .detail{
max-width:100%;
                      }
                      .review-content{
                        max-width:100%;
                       word-wrap: break-word;
  overflow-wrap: break-word;
                      }
                      .card-con{
                        display:none:
                      }
                      .card-con-mobile{
                        display:block:
                      }
}
    
      `}</style>
    </>
  )
}
