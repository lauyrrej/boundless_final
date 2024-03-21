import { useEffect, useState } from 'react'
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
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

//hook
import { useCart } from '@/hooks/use-cart'
import { wrap } from 'lodash'

//confirmlist
import LessonConfirmList from '@/components/cart/confirm-lesson-items.js'
import InstrumentConfirmList from '@/components/cart/confirm-instrument-items.js'

export default function Test() {
  let UserInfo = JSON.parse(localStorage.getItem('UserInfo'))
  //hook
  const {
    instrumentData,
    lessonData,
    calcInstrumentItems,
    calcInstrumentPrice,
    calcInstrumentDiscount,
    handleInstrumentSelector,
    calcLessonItems,
    calcLessonPrice,
    calcLessonDiscount,
    handleLessonSelector,
    calcTotalDiscount,
    calcTotalPrice,
  } = useCart()

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


  const  originOrderID = ()=>{
    const data = localStorage.getItem('orderID')
    const parseData = parseInt(data)
    return parseData
  }
  const [orderID, setOrderID] = useState(originOrderID)


  const username = UserInfo[0].Name
  const phone = UserInfo[0].Phone
  const email = UserInfo[0].Email
  const address = UserInfo[0].Address
  const country = localStorage.getItem('Country')
  const township = localStorage.getItem('Township')
  const postcode = localStorage.getItem('Postcode')
  const totaldiscount = calcTotalDiscount()
  const payment = calcTotalPrice()
  const transportationstate = '運送中'
  const cartData = localStorage.getItem('CartData')

  const sendForm = async (
    username,
    phone,
    email,
    country,
    township,
    postcode,
    address,
    totaldiscount,
    payment,
    transportationstate,
    cartData,
    orderID,
  )=>{
    let formData = new FormData()
    formData.append('username', username)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('country', country)
    formData.append('township', township)
    formData.append('postcode',postcode)
    formData.append('address', address)
    formData.append('totaldiscount', totaldiscount)
    formData.append('payment', payment)
    formData.append('transportationstate', transportationstate)
    formData.append('cartdata', cartData)
    formData.append('orderID', orderID)

    const res = await fetch('http://localhost:3005/api/cart/form', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
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
        <>
          <div className="cart">
            <h2>購物車</h2>
          </div>
          <div className="d-flex justify-content-between cart-process">
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center inactive">
                1
              </div>
              <div className="h5 cart-process-text">修改訂單</div>
            </div>
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center inactive">
                2
              </div>
              <div className="h5 cart-process-text">填寫訂單資料</div>
            </div>
            <div
              className="d-flex align-items-center ballbox"
              style={{ gap: 10 }}
            >
              <div className="ball d-flex align-items-center justify-content-center active">
                3
              </div>
              <div className="h5 cart-process-text">結帳確認</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 p-0 cart-main">
              <div className="cart-lesson">
                <div className="cart-title">訂單內容</div>
                <div className="cart-thead">
                  <div className="lesson-product">課程</div>
                  <div className="lesson-price">價格</div>
                  <div className="lesson-payment">實付金額</div>
                </div>
                <div className="cart-item-group">
                  <LessonConfirmList 
                    lessonData={lessonData}
                  />
                </div>
                <div className="cart-thead">
                  <div className="instrument-product">樂器</div>
                  <div className="instrument-price">單價</div>
                  <div className="instrument-quantity">數量</div>
                  <div className="instrument-total">總價</div>
                  <div className="instrument-payment">實付金額</div>
                </div>
                <div className="cart-item-group">
                  <InstrumentConfirmList 
                    instrumentData={instrumentData}
                  />
                </div>
              </div>
              <div className="consumer-info">
                <div className="cart-title">寄送資訊</div>
                <div className="consumer-info-group">
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="name"
                      className="col-form-label col-sm-2 col-6 h6"
                    >
                      購買者姓名
                    </label>
                    <div className="col-sm-3 col-3">{UserInfo[0].Name}</div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="phone"
                      className="col-form-label col-sm-2 col-6 h6"
                    >
                      電話號碼
                    </label>
                    <div className="col-sm-3 col-4">{UserInfo[0].Phone}</div>
                  </div>
                  <div className="row g-3">
                    <label
                      htmlfor="address"
                      className="col-form-label col-sm-2 col-6 h6"
                    >
                      寄送地址
                    </label>
                    <div className="address-location col-sm-10 col-6">
                      <div>{postcode}</div>
                      <div className="col-10 address-location-info">
                       <div>
                        {country} {township} 
                       </div>
                       <div>
                       {UserInfo[0].Address}
                       </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-instrument credit-card-info">
                <div className="cart-title">付款資訊</div>
                <div className="consumer-info-group">
                  <div className="row g-3 align-items-center">
                    <label
                      htmlFor="name"
                      className="col-form-label col-sm-2 h6"
                    >
                      付款方式
                    </label>
                    <div className="col-sm-6">信用卡</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flowcart position-sticky top-0"
              style={{ height: '100vh', paddingInline: 20, flex: '0 0 440px' }}
            >
              <div
                className="d-flex flex-column position-sticky"
                style={{ gap: 20, top: 110 }}
              >
                <div className="total d-flex flex-column" style={{ gap: 20 }}>
                  <div className="d-flex justify-content-between carttext">
                    <div>商品數量</div>
                    <div>
                      樂器*{calcInstrumentItems()} 課程*{calcLessonItems()}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between carttext">
                    <div>原價合計</div>
                    <div>NT ${calcTotalPrice()}</div>
                  </div>
                  <div className="d-flex justify-content-between carttext discount">
                    <div>折扣合計</div>
                    <div>-NT ${calcTotalDiscount()}</div>
                  </div>
                  <div className="d-flex justify-content-between h3">
                    <div>合計</div>
                    <div>NT ${calcTotalPrice() - calcTotalDiscount()}</div>
                  </div>
                </div>
                <div className="cart-btn">
                  <Link
                    href="/cart/info"
                    className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                  >
                    回上一步
                  </Link>
                  <div
                    className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                    onClick={
                      () => {
                        sendForm(
                          username,
                          phone,
                          email,
                          country,
                          township,
                          postcode,
                          address,
                          totaldiscount,
                          payment,
                          transportationstate,
                          cartData,
                          orderID,
                      )
                      }
                    }
                  >
                    確認付款
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>

      {/* 手機版 */}
      <div className="flow-cart-mb">
        <div
          className="d-flex flex-column position-sticky"
          style={{ gap: 20, top: 110 }}
        >
          <div className="total d-flex flex-column" style={{ gap: 20 }}>
            <div className="d-flex justify-content-between carttext">
              <div>商品數量</div>
              <div>
                樂器*{calcInstrumentItems()} 課程*{calcLessonItems()}
              </div>
            </div>
            <div className="d-flex justify-content-between carttext">
              <div>原價合計</div>
              <div>NT ${calcTotalPrice()}</div>
            </div>
            <div className="d-flex justify-content-between carttext discount">
              <div>折扣合計</div>
              <div>-NT ${calcTotalDiscount()}</div>
            </div>
            <div className="d-flex justify-content-between h3">
              <div>合計</div>
              <div>NT ${calcTotalPrice() - calcTotalDiscount()}</div>
            </div>
          </div>
          <div className="cart-btn">
            <Link
              href="/cart/info"
              className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
            >
              回上一步
            </Link>
            <div
              className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
              onClick={
                () => {
                  setOrderID(orderID+1)
                  localStorage.setItem('orderID', orderID)
                  sendForm(
                    username,
                    phone,
                    email,
                    country,
                    township,
                    postcode,
                    address,
                    totaldiscount,
                    payment,
                    transportationstate,
                    cartData,
                    orderID,
                )
                }
              }
            >
              確認付款
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .cart{
          color: black;
          padding: 20px 0;
        }
        .flowcart{
          @media screen and (max-width: 576px) {
            display: none;
          }
        }
        .ballbox{
          @media screen and (max-width: 576px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .cart-process {
          padding: 8px 40px;
          margin-bottom: 20px;
          @media screen and (max-width: 576px) {
            padding:0 0 0 0;
            gap:25px;
          }
          .cart-process-text{
            font-size:20px;
            text-align: center;
            @media screen and (max-width: 576px) {
              font-size:14px;
              width:100px;
            }
          }
        }
        .cart-main {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .active {
          background: var(--primary-light, #18a1ff);
        }
        .inactive {
          background: var(--body, #b9b9b9);
        }
        .ball {
          color: #fff;
          text-align: center;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          font-family: 'Noto Sans TC';
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .h5 {
          color: #000;
          /* h5 */
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .h3 {
          font-family: 'Noto Sans TC';
          font-size: 28px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .h6 {
          font-family: 'Noto Sans TC';
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .carttext {
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .discount {
          color: var(--primary, #1581cc);
        }
        .total {
          color: black;
          border-radius: 10px;
          border: 1px solid var(--primary, #1581cc);
          padding: 20px;
          align-self: stretch;
          @media screen and (max-width: 576px) {
            border: 0;
            padding: 0;
            gap: 10px !important;
          }
        }
        .cart-btn {
          width: 100%;
          display: flex;
          gap: 20px;

          justify-content: center;
          align-items: center;
          align-self: stretch;
          border-radius: 5px;
          .btn {
            width: 100%;
            padding: 14px 0px !important;
          }
          .btn-prev{
            color: var(--Gray-00, #FFF);

            /* Button Label/Large */
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px; /* 133.333% */
          }
          .btn-next{
            color: var(--Gray-00, #FFF);

            /* Button Label/Large */
            font-family: Inter;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 24px; /* 133.333% */
          }
        }
        }
        .cart-lesson {
          display: flex;
          gap: 12px;
          flex-direction: column;
          width: 100%;
        }
        .cart-instrument {
          display: flex;
          gap: 12px;
          flex-direction: column;
          width: 100%;
        }
        .cart-title {
          color: var(--white, #fff);
          font-family: 'Noto Sans TC';
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          background-color: var(--body, #b9b9b9);
          padding: 5px 12px;
        }
        .cart-thead {
          width: 100%;
          padding: 4px 12px;
          height: auto;
          display: grid;
          grid-template-columns: repeat(8, 110px);
          color: var(--primary-deep, #124365);
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          @media screen and (max-width: 576px) {
            grid-template-columns: repeat(4, 1fr);
          }
          .lesson-product {
            grid-row: 1/2;
            grid-column: 1/3;
            @media screen and (max-width: 576px) {
              grid-column: 1/3;
            }
          }
          .lesson-price {
            grid-row: 1/2;
            grid-column: 3/8;
            margin: auto;
            @media screen and (max-width: 576px) {
              grid-column: 3/4;
            }
          }
          .lesson-payment{
            grid-row: 1/2;
            grid-column: 8/9;
            margin: auto;
            @media screen and (max-width: 576px) {
              grid-column: 4/5;
            }
          }
          .instrument-product {
            grid-row: 1/2;
            grid-column: 1/3;
            @media screen and (max-width: 576px) {
              grid-column: 1/3;
            }
          }
          .instrument-price {
            grid-row: 1/2;
            grid-column: 3/5;
            margin: auto;
            @media screen and (max-width: 576px) {
              display: none;
            }
          }
          .instrument-quantity {
            grid-row: 1/2;
            grid-column: 5/6;
            margin: auto;
            @media screen and (max-width: 576px) {
              display: none;
            }
          }
          .instrument-total {
            grid-row: 1/2;
            grid-column: 6/8;
            margin: auto;
            @media screen and (max-width: 576px) {
              grid-column: 3/4;
            }
          }
          .instrument-payment{
            grid-row: 1/2;
            grid-column: 8/9;
            margin: auto;
            @media screen and (max-width: 576px) {
              grid-column: 4/5;
            }
          }
        }
        .cart-item-group {
          gap: 12px;
          padding: 12px;
          color: black;
          }

        .cart-subtotal {
          color: black;
          display: flex;
          padding: 4px 12px;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
        }
        .cart-total {
          color: black;
          display: flex;
          padding: 4px 12px;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
          .cart-total-text {
            font-family: 'Noto Sans TC';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
        }
        .delete-btn{
          display: flex;
          gap: 6px;
          padding: 5px 10px;
          vertical-align: center;
        }
        .consumer-info-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
      }
      .address-location{
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        gap: 12px 45px;
        flex-wrap: wrap;
        @media screen and (max-width: 576px) {
          flex-wrap: nowrap;
          gap: 12px 20px;
        }
      }
      .address-location-info{
        display:flex;
        column-gap:15px;
        @media screen and (max-width: 576px) {
          display:block;
          white-space: pre-wrap;
          overflow-wrap: break-word;
        }
      }

      .credit-card-info{
        color: black;
        .minussign{
          width:12px;
        }
      }
      .consumer-info{
        color: black;
      }
      .flow-cart-mb {
          display: none;
          @media screen and (max-width: 576px) {
            display: block;
            position: sticky;
            bottom: 0;
            left: 0;
            z-index: 100;
            background-color: #FFF;
            padding: 20px 30px;
            }
        }
      `}</style>
    </>
  )
}
