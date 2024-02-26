import React from 'react'

import Lesson from '@/data/Lesson.json'

//收藏的功能

// 實心圖
// import bookmarkIconFill from '@/assets/bookmark-fill.svg'
// 空心圖
// import bookmarkIcon from '@/assets/bookmark.svg'

//------------------

export default function ProductBriefCard({}) {
  return (
    <>
      <div className=" Right sticky-top ">
        <div className="prodBriefing sticky-top ">
          <div className="prodMainName">{Lesson.lesson[0].name}</div>
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
            <div className="price">NT$ {Lesson.lesson[0].price}</div>
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
              <div className="lengthHomeworkWord">
                {Lesson.lesson[0].length}分鐘
              </div>
            </div>
            <div className="lengthhomework">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4552b4fc37047176a87577807414005cf8e8466b4ef23329066c1c39e5dad447?"
                className="img-10"
              />
              <div className="lengthHomeworkWord">
                {Lesson.lesson[0].homework}份作業
              </div>
            </div>
          </div>
          <div className="lessonIntro">{Lesson.lesson[0].info}</div>
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
      <style jsx>
        {`
          .Right {
            padding-left: 100px;
          }

          .prodBriefing {
            /* background-color: #ff9595; */
             {
              /* margin-left: 20px; */
            }
            top: 120px;
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
            margin-top: 20px;
            justify-content: space-evenly;
            gap: 12px;
            font-size: 16px;
            color: var(--white, #fff);
            font-weight: 700;
          }

          .cartBtn {
            display: flex;
            justify-content: space-between;
            border-radius: 5px;
            background-color: var(--body, #b9b9b9);
            gap: 12px;
            padding: 8px 78px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
            }
          }

          .buyBtn {
            display: flex;
            justify-content: space-between;
            border-radius: 5px;
            background-color: #18a1ff;
            gap: 12px;
            padding: 8px 78px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
               {
                /* 要改顏色！！ */
              }
              //TODO
              //FIXME
            }
          }
        `}
      </style>
    </>
  )
}
