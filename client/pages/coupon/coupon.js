import React from 'react'
import logoBlue from '/coupon/logoBlue.jpg' // 確保路徑正確
import logoWhite from '/coupon/logoWhite.jpg' // 確保路徑正確
import cameraFill from '/coupon/CameraFill.png' // 確保路徑正確
import userPhoto from '/coupon/Ellipse 13.png' // 確保路徑正確

function UserPanel() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-sm-3"
          style={{ backgroundColor: 'rgb(221, 221, 221)', height: '100vh' }}
        >
          <div className="userBar">
            <div className="userNavbar">
              <div className="userInfo">
                <div className="userphoto">
                  <Image src={userPhoto} alt="" />
                </div>
                <div className="userCamera">
                  <Image src={cameraFill} alt="" />
                </div>
                <div className="userInfoText">
                  <h6>帕魯</h6>
                  <h6>PalWorld樂團</h6>
                </div>
              </div>
              <div className="userList">
                <ul>
                  <li>會員資訊</li>
                  <li>我的樂團</li>
                  <li>我的訂單</li>
                  <li>我的文章</li>
                  <li>我的收藏</li>
                  <li>我的優惠券</li>
                  <li>我的課程</li>
                  <li>我的訊息</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-sm-9"
          style={{ backgroundColor: 'rgb(255, 255, 255)', height: '100vh' }}
        >
          <div className="indexIcon">會員中心>我的優惠券</div>
          <div className="couponContent">
            <div className="couponSlogan">
              <h3>我的優惠券</h3>
              <div className="couponType me-20">
                <div className="btn">全部</div>
                <div className="btn">樂器</div>
                <div className="btn">課程</div>
              </div>
              <div className="couponLimit">
                排序：
                <div className="btn">折扣幅度</div>
                <div className="btn">即將到期</div>
              </div>
            </div>
            <div className="couponList d-flex">
              {/* Coupon Card Repeated */}
              {[...Array(2)].map((_, index) => (
                <div key={index} className="card mb-3 mt-3 me-5">
                  <div className="row g-0">
                    <div className="col-md-3 mt-2">
                      <Image
                        src={index % 2 === 0 ? logoBlue : logoWhite}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body p-1 d-flex">
                        <div>
                          <h5 className="card-title">
                            {index % 2 === 0 ? '樂器優惠券' : '課程優惠券'}
                          </h5>
                          <h3 className="card-text">
                            {index % 2 === 0 ? '$2000' : '95折'}
                          </h3>
                          <p className="card-text">
                            <small className="text-muted">
                              到期日：2024/12/31
                            </small>
                          </p>
                        </div>
                        <div>
                          <h5 className="mb-3">優惠券名稱：</h5>
                          <h5>註冊禮</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPanel
