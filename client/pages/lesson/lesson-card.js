import React, { useState } from 'react'
import Image from 'next/image'
// icon
import { FaStar } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'
import { MdOutlinePeopleAlt } from 'react-icons/md'

export default function CourseCard() {
  const [isDiscount, setIsDiscount] = useState(false)
  return (
    <>
      <article className="course-card">
        <div className="course-image-wrapper">
          <Image
            loading="lazy"
            src="/jam/amazingshow.jpg"
            alt="Course Preview"
            fill
          />
        </div>

        <section className="course-details">
          <h3 className="course-title mb-1">
            樂理指法一把抓 - 鋼琴基礎從零開始
          </h3>
          <p className="course-instructor">by XX老師</p>
          <div className="course-info">
            <div className="rating">
              <FaStar size={18} color="#faad14" />
              <span className="rating-value">4.9</span>
              <span className="review-count">(3)</span>
            </div>
            <div>
              <span className="duration-time">
                <GoClock size={16} color="#5a5a5a" />
                5小時
              </span>
            </div>
          </div>
          {/* {isDiscount ? (
            <div className="course-price">
              <del>NT$ 4,000</del>
              <div style={{ color: '#ec3f3f' }}>NT$ 3,800</div>
            </div>
          ) : (
            <div className="course-price">
              <div>NT$ 4,000</div>
            </div>
          )} */}
          <div className="course-price">
            <div>NT$ 4,000</div>
          </div>
          <div className="students">
            <MdOutlinePeopleAlt size={16} color="#5a5a5a" />
            <span>50</span>
          </div>
        </section>
      </article>
      <style jsx>{`
        .course-card {
          max-width: 240px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #b9b9b9;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .course-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          position: relative;
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
          gap: 5px;
        }

        .course-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #1d1d1d;
          font-weight: 400;
          padding: 14px 12px;
        }
        .course-title {
          font-size: 16px;
          font-family: Noto Sans TC, sans-serif;
          margin: 0;
        }
        .course-instructor {
          font-size: 14px;
          color: #5a5a5a;
          margin-bottom: 0;
        }
        .duration-time {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }
        .students {
          display: flex;
          align-items: center;
          justify-content: end;
          gap: 5px;
          font-size: 14px;
        }

        .course-price {
          font-size: 18px;
          font-family: Noto Sans TC, sans-serif;
          font-weight: 700;
          height: 60px;
        }
        .enrolled-students {
          text-align: right;
          color: #5a5a5a;
          font-size: 14px;
          font-family: Noto Sans TC, sans-serif;
           {
            /* margin-top: 46px; */
          }
        }
        /* Add your existing styles here */
      `}</style>
    </>
  )
}
