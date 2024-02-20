import React from 'react'
import Image from 'next/image'
export default function CouponBlue() {
  return (
    <>
      {/* 藍色LOGO */}
      <div className="coupon-container ms-3 mb-4">
        <div className="coupon-card d-flex align-items-center">
          <Image
            className="coupon-background bgWhite"
            src="/coupon/bgWhite.png"
            alt=""
            fill
          />
          <div className="coupon-content d-flex">
            <div>
              <Image
                className="coupon-logo-blue"
                src="/coupon/logoBlue.png"
                alt=""
                fill
              />
            </div>
            <div className="">
              <div className="h5 ms-2 mt-1">課程優惠券</div>
              <div className="h3 ms-2">95折</div>
              <div className="coupon-text ms-2">到期日：2024/12/31</div>
            </div>
            <div className="name">
              <div className="h5 mt-1">
                優惠券名稱
                <br />
                註冊禮
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
