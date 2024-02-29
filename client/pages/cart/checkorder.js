import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'

export default function Test() {
  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop:'60px'}}>
        {/* 頁面內容 */}
        <main
        >
          <div>
            <h2>購物車</h2>
          </div>
          <div className="d-flex justify-content-between cart-process">
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center">
                1
              </div>
              <div className="h5">確認/修改訂單</div>
            </div>
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center">
                2
              </div>
              <div className="h5">填寫訂單資料</div>
            </div>
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              <div className="ball d-flex align-items-center justify-content-center">
                3
              </div>
              <div className="h5">結帳確認</div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-sm-8"
              style={{ backgroundColor: 'rgb(255, 156, 156)', height: '100vh' }}
            >
              <div className="cart-title">課程</div>
              <div className="cart-lesson">
                <div className="lesson-item"></div>
              </div>
              <div className="cart-instrument">
                <div className="instrument-item" />
              </div>
            </div>
            <div
              className="col-sm-4 position-sticky top-0"
              style={{ backgroundColor: 'rgb(195, 195, 195)', height: '100vh' }}
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
                  <div className="btn btn-primary">結帳</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />

      <style jsx>{`
      
        .cart-process {
          padding: 8px 40px;
        }
        .ball {
          background-color: #1581cc;
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
        .carttext {
          font-family: 'Noto Sans TC';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .discount {
          color: #1581cc;
        }
        .total {
          border-radius: 10px;
          border: 1px solid #1581cc;
          padding: 20px;
          align-self: stretch;
        }
        .cart-btn {
          width: 100%;
          display: flex;

          justify-content: center;
          align-items: center;
          align-self: stretch;
          border-radius: 5px;
          .btn {
            width: 100%;
            padding: 14px 0px !important;
          }
        }
        .cart-lesson {
          width: 100%;
          height: 100px;
          background-color: blue;
        }
      `}</style>
    </>
  )
}
