import React from 'react'
import styles from '@/components/coupon/coupon.module.scss'
import Data from '@/data/Coupon.json'

export default function Coupon() {
  console.log(Data)
  return (
    <>
      <div className={`${styles.couponCard} card mb-3`}>
        <div className="row  d-flex g-0">
          {/* 左 */}
          <div className="col-3">
            <img
              className={`${styles.couponImg} my-3 p-2`}
              src="/coupon/logoWhite.jpg"
              alt="..."
            />
          </div>
          <div className="col-9">
            <div className="card-body d-flex justify-content-between py-2">
              <div>
                <h5
                  className="p-1
                  card-title fw-bold"
                >
                  {Data[6].name}
                  {/* 註冊禮XX */}
                </h5>
                <h4 className="px-3 py-2">
                  {Data[6].kind}
                  {/* 課程 */}
                </h4>
              </div>
              <div className="card-text d-flex justify-content-center align-items-center">
                <div className="fs-2 fw-bold salesType">
                  {Data[6].discount}
                  {/* 95折 */}
                </div>
              </div>
            </div>
            {/* 下 */}
            <div>
              <p className="card-text px-4 py-1">
                <small className="text-muted ">到期日：2024/12/31</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  )
}
