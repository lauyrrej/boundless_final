import React from 'react'
import styles from '@/components/coupon/coupon.module.scss'
export default function CouponBlue() {
  return (
    <>
      {/*----------------logo底色藍色----------------*/}
      {/*  couponCard mb-3 mt-3  */}
      <div className={styles['couponCard']}>
        <div className="row g-0">
          {/* mt-2 */}
          <div className="col-md-3 mt-1">
            <img
              src="/coupon/logoBlue.jpg"
              className="img-fluid rounded-start logoBlue"
              alt="..."
            />
          </div>
          <div className="col-md-9">
            {/* card-body p-1 d-flex */}
            <div className={styles['card-body']}>
              <div>
                <h5 className={styles['card-title']}>課程優惠券</h5>
                <h3 className={styles['card-type']}>95折</h3>
                <p className="card-text">
                  <small className="text-muted">到期日：2024/12/31</small>
                </p>
              </div>
              <div>
                {/* mb-3 */}
                <h5 className={styles['card-title']}>優惠券名稱：</h5>
                <h5>註冊禮</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  )
}
