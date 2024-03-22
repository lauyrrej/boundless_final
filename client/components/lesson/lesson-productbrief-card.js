import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
//toast
import toast, { Toaster } from 'react-hot-toast'
//收藏的功能

//跳轉頁面
import Link from 'next/link'

export default function ProductBriefCard({
  id,
  img,
  img_small,
  type,
  lesson_category_id,
  name,
  homework,
  sales,
  price,
  discount,
  discount_state,
  length,
  info,
  onshelf_time,
  addLessonItem = () => {},
  calcTotalItems = () => {},
}) {
  //收藏按鍵的功能
  const [colorChange, setcolorChange] = useState(false)
  const colorToggle = () => {
    //按按鍵切換狀態
    setcolorChange(!colorChange)
  }

  // ----------------------加入右上角購物車的功能  ----------------------
// console.log(id);

  //toast
    const notify = () =>
      toast('{LessonDetail.data[0].name}已加入購物車.')

  return (
    <>
      <div className=" Right sticky-top ">
        <div className="prodBriefing naughty-sticky " style={{ top: '80px' }}>
          <div className="prodMainName">{name}</div>
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
            <div className="sales">購買人數 {sales}</div>
          </div>
          <div className="productPrice">
            <div className="price">NT$ {price}</div>
            {/* 收藏功能 */}
            {/* 做好的 onClick*/}
            <div className="likesIcon icon-container ">
              <FaHeart
                className="likesIcon"
                size="32px"
                style={{ color: `${colorChange ? 'red' : ''}` }}
                onClick={colorToggle}
              />
            </div>
            {/* 本來的likesIcon */}
            {/* <img
              loading="lazy"
              src="	https://cdn.builder.io/api/v1/image/assets/TEMP/5e…de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?"
              style={{ color: `${showSidebar ? 'red' : ''}` }}
              className={`likesIcon ${showSidebar ? 'change-color' : ''}`}
              onClick={sidebarToggle}
            /> */}
          </div>
          <div className="lengthHomeworkArea">
            <div className="lengthhomework">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/81a1d10e78e821775737fe4938ae726e8de4a80804b01bdda9876d9f86f9b1bb?"
                className="lengthIcon"
              />
              <div className="lengthHomeworkWord">{length}小時</div>
            </div>
            <div className="lengthhomework">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4552b4fc37047176a87577807414005cf8e8466b4ef23329066c1c39e5dad447?"
                className="img-10"
              />
              <div className="lengthHomeworkWord">{homework}份作業</div>
            </div>
          </div>
          <div className="lessonIntro">{info}</div>
          <div className="shoppingBtn">
            <div
              className="cartBtn"
              onClick={() => {
                  addLessonItem({
                      id,
                      img,
                      img_small,
                      type,
                      lesson_category_id,
                      name,
                      homework,
                      sales,
                      price,
                      discount,
                      discount_state,
                      length,
                      info,
                      onshelf_time,
                  });
                  calcTotalItems();// Moved inside the onClick function
                  notify();
              }}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c240e4bc8653fe6179383ea22f1eb80902c70eec255a944e9d8e0efbf823c4e3?"
                className=""
              />
              <div className="cart">加入購物車</div>
              <Toaster /> //FIXME吐司跑不出來
            </div>
            <div
              className="buyBtn"
              onClick={() =>
                addLessonItem({
                  id,
                  img,
                  img_small,
                  type,
                  lesson_category_id,
                  name,
                  homework,
                  sales,
                  price,
                  discount,
                  discount_state,
                  length,
                  info,
                  onshelf_time,
                })
              }
            >
              <Link className="buy" href="/cart/check">
                立即購買
              </Link>
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <style jsx>
        {`
          .naughty-sticky {
            position: sticky;
            top: 0;
            z-index: 1020;
          }

          .icon-container {
            display: flex;
            padding: 1px 1px; /* 可选：添加一些内边距以使边框与图标之间有空间 */
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            border: 1px solid var(--body, #b9b9b9);
          }
          .Right {
            margin-left: 45px;
            top: 80px;
          }

          .prodBriefing {
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
            flex: 1 0 0;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
            }
          }

          .buyBtn {
            display: flex;
            justify-content: center;
            border-radius: 5px;
            background-color: #18a1ff;
            gap: 12px;
            padding: 8px 78px;
            flex: 1 0 0;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
            }
          }
        `}
      </style>
    </>
  )
}
