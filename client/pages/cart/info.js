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
import { FiMinus } from 'react-icons/fi'

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
              <div className="ball d-flex align-items-center justify-content-center active">
                2
              </div>
              <div className="h5 cart-process-text">填寫訂單資料</div>
            </div>
            <div className="d-flex align-items-center ballbox" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center inactive">
                3
              </div>
              <div className="h5 cart-process-text">結帳確認</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 p-0 cart-main" style={{ height: '100vh' }}>
              <div className="consumer-info">
                <div className="cart-title">寄送資訊</div>
                <div className="consumer-info-group">
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="name"
                      className="col-form-label col-sm-2 h6"
                    >
                      購買者姓名
                    </label>
                    <div className="col-sm-3 col-6">
                      <input type="text" className="form-control" id="name" />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="phone"
                      className="col-form-label col-sm-2 h6"
                    >
                      電話號碼
                    </label>
                    <div className="col-sm-3 col-6">
                      <input type="text" className="form-control" id="phone" />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlfor="email"
                      className="col-form-label col-sm-2 h6"
                    >
                      電子信箱
                    </label>
                    <div className="col-sm-5 col-10">
                      <input type="text" className="form-control" id="email" />
                    </div>
                  </div>
                  <div className="row g-3">
                    <label
                      htmlfor="address"
                      className="col-form-label col-sm-2 h6"
                    >
                      寄送地址
                    </label>
                    <div className="address-location col-sm-10">
                      <div className="col-sm-3">
                        <label htmlfor="country" className="form-label">
                          縣/市
                        </label>
                        <select
                          className="form-select"
                          name="country"
                          id="country"
                        >
                          <option value="" selected="">
                            台北市
                          </option>
                        </select>
                      </div>
                      <div className="col-sm-3">
                        <label htmlfor="district" className="form-label">
                          區/鎮/鄉
                        </label>
                        <select
                          className="form-select"
                          name="district"
                          id="district"
                        >
                          <option value="" selected="">
                            中正區
                          </option>
                        </select>
                      </div>
                      <div className="col-sm-7">
                        <label htmlfor="addressinfo" className="form-label">
                          詳細地址
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addressinfo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-instrument credit-card-info">
                <div className="cart-title">付款資訊</div>
                <div className="consumer-info-group">
                  <div>
                    <label>轉帳匯款</label>
                    <input
                      type='radio'
                    />
                  </div>
                  <div>
                    <hr />
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlFor="name"
                      className="col-form-label col-sm-2 h6"
                    >
                      持卡人姓名
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Ex:HSIANG-AN, YANG"
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlFor="credit-card-number"
                      className="col-form-label col-sm-2 h6"
                    >
                      信用卡卡號
                    </label>
                    <div className="creditcard" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="credit-card-number"
                        maxLength={4}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                    <div className="w-auto minussign">
                      <FiMinus />
                    </div>
                    <div className="creditcard" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="credit-card-number"
                        maxLength={4}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                    <div className="w-auto minussign">
                      <FiMinus />
                    </div>
                    <div className="creditcard" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="credit-card-number"
                        maxLength={4}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                    <div className="w-auto minussign">
                      <FiMinus />
                    </div>
                    <div className="creditcard" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="credit-card-number"
                        maxLength={4}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlFor="email"
                      className="col-form-label col-sm-2 h6"
                    >
                      有效期限
                    </label>
                    <div className="" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="expiration-date"
                        placeholder="MM"
                        maxLength={2}
                        min={1}
                        max={12}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                    <div className="w-auto minussign">
                      <FiMinus />
                    </div>
                    <div className="" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        id="expiration-date"
                        placeholder="YY"
                        maxLength={2}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <div className="row g-3 align-items-center">
                    <label
                      htmlFor="3-number"
                      className="col-form-label col-sm-2 h6"
                    >
                      背面末三碼
                    </label>
                    <div className="" style={{ width: '5rem' }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{ textAlign: 'center' }}
                        id="3-number"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="position-sticky top-0 flowcart"
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
                  <div className="btn btn-prev btn-secondary">回上一步</div>
                  <div className="btn btn-next btn-primary">確認付款</div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <Footer />

      <style jsx>{`
        .cart{
          color: black;
          padding: 20px 0;
        }
        .flowcart {
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
          .cart-discount {
            color: var(--primary, #1581cc);
            grid-column: 7/9;
            margin-left: auto;
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
      }
      .credit-card-info{
        color: black;
        .minussign{
          width:12px;
          @media screen and (max-width: 576px) {
            padding:0 4px
          }
        }
      }
      .consumer-info{
        color: black;
      }
      `}</style>
    </>
  )
}
