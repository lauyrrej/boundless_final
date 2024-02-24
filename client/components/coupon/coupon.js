import React from 'react'
import styles from '@/components/coupon/coupon.module.scss'
export default function Coupon() {
  return (
    <>
      <div className={`${styles.couponCard} card mb-3`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              className={`${styles.couponImg} my-2 p-2`}
              src="/coupon/logoWhite.jpg"
              alt="..."
            />
          </div>
          <div className="col-md-8 py-2 px-1">
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="card-title fw-bold">註冊禮</h4>
                <h6>用途：課程</h6>
              </div>
              <div className="d-flex justify-content-center align-items-center px-2">
                <div className="px-1 fs-2 fw-bold salesType">95折</div>
              </div>
            </div>
            <div>
              <p className="card-text">
                <small className="text-muted">到期日：2024/12/31</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  )
}