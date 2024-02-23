

import React from 'react'

 export default function CourseCard() {
  return (
    <>
      <article className="course-card">
        <header className="course-header">Logic Pro X 從零開始</header>
        <section className="course-details">
          <div className="rating-and-purchase">
            <div className="rating">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?apiKey=17f0a1e40fbb49909697106038f17c0a&"
                alt="Rating"
                className="rating-image"
              />
              <span className="rating-score">4.9</span>
              <span className="rating-count">(10)</span>
            </div>
            <div className="purchase-count">購買人數 50</div>
          </div>
          <div className="price-and-add">
            <div className="price">NT$ 1,800</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed2e715f1421a33de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?apiKey=17f0a1e40fbb49909697106038f17c0a&"
              alt="Add to cart"
              className="add-to-cart-icon"
            />
          </div>
          <div className="course-meta">
            <div className="lesson-duration">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1044f14ba3978f21964ac15264fa66eb69568fcf0d6991acf6fd3cad63fe4203?apiKey=17f0a1e40fbb49909697106038f17c0a&"
                alt="Duration"
                className="duration-icon"
              />
              <div className="duration">5小時</div>
            </div>
            <div className="homework-assignment">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/16e2c71f36f5dd28f201dca5531ff7f311dd54b938c5459cc23b52fa5f2be0a8?apiKey=17f0a1e40fbb49909697106038f17c0a&"
                alt="Homework"
                className="homework-icon"
              />
              <div className="assignment">1份作業</div>
            </div>
          </div>
          <div className="course-description">
            Logic
            Pro為數位音樂編曲入門的必學軟體，從錄音、編曲到混音一次包辦，帶你認識錄音介面、多重效果器，以及豐富的內建素材庫，是對音樂創作有興趣的你不可錯過的專業音樂編曲課程。
          </div>
        </section>
        <footer className="course-footer">
          <button className="add-to-cart">加入購物車</button>
          <button className="buy-now">立即購買</button>
        </footer>
      </article>
      <style jsx>{`
        .course-card {
          display: flex;
          flex-direction: column;
          max-width: 550px;
          padding: 50px 0;
          background-color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .course-header {
          font-weight: bold;
          font-size: 24px;
          color: #333;
          margin-bottom: 16px;
        }
        .course-details,
        .rating-and-purchase,
        .price-and-add,
        .course-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .rating {
          display: flex;
          align-items: center;
        }
        .rating-image {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
        .rating-score,
        .rating-count,
        .purchase-count,
        .price,
        .duration,
        .assignment {
          font-size: 14px;
        }
        .course-description {
          color: #666;
          font-size: 14px;
          text-align: justify;
        }
        .course-footer {
          display: flex;
          justify-content: space-between;
        }
        .add-to-cart,
        .buy-now {
          cursor: pointer;
          padding: 10px 20px;
          text-align: center;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 14px;
        }
        .add-to-cart {
          background-color: #f9a825;
        }
        .buy-now {
          background-color: #c62828;
        }
      `}</style>
    </>
  )
}