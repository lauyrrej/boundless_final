import React from 'react'
import Image from 'next/image'

export default function CourseCard() {
  return (
    <>
      <article className="course-card">
        <Image
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7714ac15cb7337bab3fdd53e00644245f4a840747cf1ecc2bc44e48164d588a?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
          alt="Course Preview"
        />
        {/* <section className="course-image-wrapper"></section> */}
        <section className="course-details">
          <div className="course-title">樂理指法一把抓 - 鋼琴基礎從零開始</div>
          <div className="course-instructor">by XX老師</div>
          <div className="course-info">
            <div className="rating">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8287886cc0f8e59d93376690dc57f4af99a9e899badb88e0d2ed47fdb08d035?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                alt="Rating stars"
                className="rating-stars"
              />
              <div className="rating-value">4.9</div>
              <div className="review-count">(3)</div>
            </div>
            <div>
              <span className="duration-time">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8df3a2bdde335108c6d04c0849bce7699504c28286258ab16838e6cce714455f?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                  alt="Clock icon"
                  className="duration-icon"
                />
                5小時
              </span>
            </div>
          </div>
          <div className="course-price">NT$ 4,000</div>
          <div className="enrolled-students">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d3076872f8f7cffe3e64f324e5f3c6851c51802240e5b7749e95a5dcbb6ab69?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
              alt="User icon"
              className="user-icon"
            />
            <span className="enrollment-count">50</span>
          </div>
        </section>
      </article>
      <style jsx>{`
        .course-card {
          max-width: 240px;
          border-radius: 5px;
          border: 1px solid #b9b9b9;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
        .course-image-wrapper {
          {/* display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          position: relative; */}
          aspect-ratio: 1.33;
          width: 100%;
        }
        .course-image,
        .icon-image {
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .icon-image {
          position: absolute;
          width: 20px;
          bottom: 12px;
          right: 12px;
        }
        .course-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .rating {
          display: flex;
          align-items: center;
        }

        .course-details {
          display: flex;
          flex-direction: column;
           {
            {/* /* color: #1d1d1d; */ */}
          }
          font-weight: 400;
          padding: 14px 12px;
        }
        .course-title {
          font-size: 16px;
          font-family: Noto Sans TC, sans-serif;
          margin: 0;
        }

        .course-price {
          font-size: 18px;
          font-family: Noto Sans TC, sans-serif;
          font-weight: 700;
          margin-top: 11px;
        }
        .enrolled-students {
          text-align: right;
          color: #5a5a5a;
          font-size: 14px;
          font-family: Noto Sans TC, sans-serif;
          margin-top: 46px;
        }
        /* Add your existing styles here */
      `}</style>
    </>
  )
}
