import { React, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import Instrument from '@/data/instrument/instrument.json'
import toast, { Toaster } from 'react-hot-toast'
//收藏的功能

//跳轉頁面
import Link from 'next/link'

export default function ProductBriefCard({
  id,
  img,
  img_small,
  type,
  instrument_category_id,
  name,
  sales,
  price,
  discount,
  discount_state,
  info,
  addInstrumentItem = () => {},
}) {
  //收藏按鍵的功能
  const [colorChange, setcolorChange] = useState(false)
  const colorToggle = () => {
    //按按鍵切換狀態
    setcolorChange(!colorChange)
  }

  // ----------------------加入右上角購物車的功能
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      const newItem = { ...product, quantity: 1 }
      setCartItems([...cartItems, newItem])
    }
    setCartCount(cartCount + 1)
    toast(`${Instrument[0].name}已加入購物車中`)
  }

  //數量增減功能
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <>
      <div className="Right sticky-top">
        <div className="prodBriefing sticky-top ">
          <div className="prodMainName">{name}</div>
          <div className="Rating">
            <div className="star">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?"
                className="starImg"
              />
              <div className="ratingNumber">4.9</div>
              <div className="commentNumber">(3)</div>
            </div>
            <div className="sales">已售出 {sales}</div>
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
          </div>
          <div className="Intro">{info}</div>
          {/* 數量選擇器 */}
          {/* 庫存等於0時應該顯示 暫無庫存*/}

          <div>
            {quantity === 0 ? (
              <h6 className="ms-4 mt-2">暫無庫存</h6>
            ) : (
              <div className="quantitySelector">
                <div className="btn decrease-btn" onClick={decreaseQuantity}>
                  -
                </div>
                <div className="quantity">{quantity}</div>
                <div className="btn increase-btn" onClick={increaseQuantity}>
                  +
                </div>
              </div>
            )}
          </div>

          <div className="shoppingBtn">
            <div
              className="cartBtn"
              onClick={() =>
                addInstrumentItem({
                  id,
                  img,
                  img_small,
                  type,
                  instrument_category_id,
                  name,
                  sales,
                  price,
                  discount,
                  discount_state,
                  info,
                })
              }
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c240e4bc8653fe6179383ea22f1eb80902c70eec255a944e9d8e0efbf823c4e3?"
                className="cartIcon"
              />
              <div className="cart">加入購物車</div>
            </div>
            <div className="buyBtn">
              <Link className="buy" href="/cart/check">
                立即購買
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .Right {
            top: 80px;
          }

          .prodBriefing {
            /* background-color: #ff9595; */
            margin-left: 45px;
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
          .quantitySelector {
            display: flex;
            align-items: center;
            margin-top: 20px;
          }
          .decrease-btn {
            height: 40px;
            width: 40px;
            border-radius: 5px 0px 0px 5px;
            border: 1px solid var(--body, #b9b9b9);
          }
          .quantity {
            display: flex;
            width: 78px;
            height: 40px;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--body, #b9b9b9);
          }
          .increase-btn {
            color: white;
            height: 40px;
            width: 40px;
            border-radius: 0px 5px 5px 0px;
            background: var(--body, #b9b9b9);
          }
          .shoppingBtn {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
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
