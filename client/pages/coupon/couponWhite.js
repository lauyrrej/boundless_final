import React from 'react'
import Image from 'next/image'
;<>
  {/* 白色LOGO */}
  <div className="coupon-container ms-3 mb-4">
    <div className="coupon-card d-flex align-items-center">
      <Image
        className="coupon-background"
        src="/assets/coupon/bgWhite.png"
        alt=""
      />
      <div className="coupon-content d-flex">
        <div>
          <Image
            className="coupon-logo"
            src="/assets/coupon/logoWhite.png"
            alt=""
          />
        </div>
        <div className="">
          <div className="h5 ms-2 mt-2">樂器優惠券</div>
          <div className="h3 ms-2">$2000</div>
          <div className="coupon-text ms-2">到期日：2024/12/31</div>
        </div>
        <div className="name">
          <div className="h5 mt-2">
            優惠券名稱
            <br />
            註冊禮
          </div>
        </div>
      </div>
    </div>
  </div>
</>
