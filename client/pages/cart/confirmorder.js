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
        <>
          <div className='cart'>
            <h2>購物車</h2>
          </div>
          <div className="d-flex justify-content-between cart-process">
            <div className="d-flex align-items-center ballbox" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center inactive">
                1
              </div>
              <div className="h5 cart-process-text">確認/修改訂單</div>
            </div>
            <div className="d-flex align-items-center ballbox" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center inactive">
                2
              </div>
              <div className="h5 cart-process-text">填寫訂單資料</div>
            </div>
            <div className="d-flex align-items-center ballbox" style={{ gap: 10 }}>
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
                  <div className="lesson-item">
                    <div className="lesson-item-name h6">
                      Logic Pro X 從零開始
                    </div>
                    <div className="lesson-item-price h6">$26000</div>
                    <div className="lesson-item-payment h6">$26000</div>
                  </div>
                </div>
                <div className="cart-thead">
                  <div className="instrument-product">樂器</div>
                  <div className="instrument-price">單價</div>
                  <div className="instrument-quantity">數量</div>
                  <div className="instrument-total">總價</div>
                  <div className="instrument-payment">實付金額</div>
                </div>
                <div className="cart-item-group">
                  <div className="instrument-item">
                    <div className="instrument-item-name h6">
                      Logic Pro X 從零開始
                    </div>
                    <div className="instrument-item-price h6">$26000</div>
                    <div className="instrument-item-quantity h6">10</div>
                    <div className="instrument-item-total h6">$26000</div>
                    <div className="instrument-item-payment h6">$26000</div>
                  </div>
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
                    <div className="col-sm-3 col-3">
                      李宗盛
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="phone"
                      className="col-form-label col-sm-2 col-6 h6"
                    >
                      電話號碼
                    </label>
                    <div className="col-sm-3 col-4">
                      0922333444
                    </div>
                  </div>
                  <div className="row g-3">
                    <label
                      htmlfor="address"
                      className="col-form-label col-sm-2 col-6 h6"
                    >
                      寄送地址
                    </label>
                    <div className="address-location col-sm-10 col-6">
                      <div>320</div>
                      <div>桃園市中壢區新生路二段421號</div>
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
                    <div className="col-sm-6">
                      信用卡
                    </div>
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
                    <div>樂器*3 課程*2</div>
                  </div>
                  <div className="d-flex justify-content-between carttext">
                    <div>原價合計</div>
                    <div>NT $864000</div>
                  </div>
                  <div className="d-flex justify-content-between carttext discount">
                    <div>折扣合計</div>
                    <div>-NT $3400</div>
                  </div>
                  <div className="d-flex justify-content-between h3">
                    <div>合計</div>
                    <div>NT $790000</div>
                  </div>
                </div>
                <div className="cart-btn">
                  <div
                    className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                  >
                    回上一步
                  </div>
                  <div
                    className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
                    style={{ padding: '14px 0' }}
                  >
                    確認付款
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="flow-cart-mb" style={{}}>
        <div
          className="d-flex flex-column position-sticky"
          style={{ gap: 20, top: 110 }}
        >
          <div className="total d-flex flex-column" style={{ gap: 20 }}>
            <div className="d-flex justify-content-between carttext">
              <div>商品數量</div>
              <div>樂器*3 課程*2</div>
            </div>
            <div className="d-flex justify-content-between carttext">
              <div>原價合計</div>
              <div>NT $864000</div>
            </div>
            <div className="d-flex justify-content-between carttext discount">
              <div>折扣合計</div>
              <div>-NT $3400</div>
            </div>
            <div className="d-flex justify-content-between h3">
              <div>合計</div>
              <div>NT $790000</div>
            </div>
          </div>
          <div className="cart-btn">
            <div
              className="b-btn b-btn-body d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
            >
              回上一步
            </div>
            <div
              className="b-btn b-btn-primary d-flex w-100 h-100 justify-content-center"
              style={{ padding: '14px 0' }}
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
          .lesson-item {
            display: grid;
            place-content: center;
            grid-template-columns: repeat(8, 110px);
            @media screen and (max-width: 576px) {
              grid-template-columns: repeat(4, 1fr);
            }
            .lesson-item-name {
              grid-row: 1/2;
              grid-column: 1/3;
              margin-block: auto;
              padding-left: 10px;
              @media screen and (max-width: 576px) {
                grid-column: 1/3;
                padding-left: 0;
              }
            }
            .lesson-item-price {
              grid-row: 1/2;
              grid-column: 3/8;
              margin: auto;
              @media screen and (max-width: 576px) {
                grid-column: 3/4;
              }
            }
            .lesson-item-payment{
              grid-row: 1/2;
              grid-column: 8/9;
              margin: auto;
              @media screen and (max-width: 576px) {
                grid-column: 4/5;
              }
            }
          }
          .instrument-item {
            display: grid;
            place-content: center;
            grid-template-columns: repeat(8, 110px);
            @media screen and (max-width: 576px) {
              grid-template-columns: repeat(4, 1fr);
            }
            .instrument-item-name {
              grid-row: 1/2;
              grid-column: 1/3;
              margin-block: auto;
              padding-left: 10px;
              @media screen and (max-width: 576px) {
                grid-column: 1/3;
                padding-left: 0;
              }
            }
            .instrument-item-price {
              grid-row: 1/2;
              grid-column: 3/5;
              margin: auto;
              @media screen and (max-width: 576px) {
                display: none;
              }
            }
            .instrument-item-quantity {
              padding: 0 26px;
              grid-row: 1/2;
              grid-column: 5/6;
              margin: auto;
              @media screen and (max-width: 576px) {
                display: none;
              }
            }
            .instrument-item-total {
              grid-row: 1/2;
              grid-column: 6/8;
              margin: auto;
              @media screen and (max-width: 576px) {
                grid-column: 3/4;
              }
            }
            .instrument-item-payment{
              grid-row: 1/2;
              grid-column: 8/9;
              margin: auto;
              @media screen and (max-width: 576px) {
                grid-column: 4/5;
              }
            }
            .quantity-left-minus {
              margin: auto;

              width: 40px;
              height: 40px;
              .minussign::before {
                content: '\x91';
                color: #000;
                /* sidebar-font */
                font-family: 'Noto Sans TC';
                font-size: 16px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
              }
            }
            .quantity-right-plus {
              width: 40px;
              height: 40px;
              .plussign::before {
                content: '\x17';
                color: var(--white, #fff);
                /* sidebar-font */
                font-family: 'Noto Sans TC';
                font-size: 12px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
              }
            }
            .input-number {
              text-align: center;
              color: #000;

              /* sidebar-font */
              font-family: 'Noto Sans TC';
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }
          }
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
        /* width: 664px; */
        align-items: flex-start;
        align-content: flex-start;
        gap: 12px 45px;
        flex-wrap: wrap;
        @media screen and (max-width: 576px) {
          flex-wrap: nowrap;
          gap: 12px 20px;
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
