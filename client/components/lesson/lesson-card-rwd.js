import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// icon
import { FaStar } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'
import { MdOutlinePeopleAlt } from 'react-icons/md'

export default function CourseCard({
  luid,
  name,
  average_rating,
  review_count,
  price,
  teacher_name,
  img,
  length,
  sales,
  discount,
}) {
  return (
    <>
      <Link href={`/lesson/${luid}`}>
        <article className="course-container">
          <Image
            className="course-image"
            loading="lazy"
            src={`/課程與師資/lesson_small/${img}`}
            alt="Course Preview"
            fill
          />
          <div className="course-details">
            <h2 className="course-title">{name}</h2>
            <p className="course-instructor">by {teacher_name}老師</p>
            <div className="course-meta">
              <div className="rating">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8287886cc0f8e59d93376690dc57f4af99a9e899badb88e0d2ed47fdb08d035?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                  alt="評分"
                  className="rating-image"
                />
                <span className="rating-value">{average_rating}</span>
                <span className="rating-count">({review_count})</span>
              </div>
              <div className="course-duration">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/65fa44297b430826617ac8cc6a4cf7e2cf251e32574954239a3cb8b5c74c8ca0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                  alt="時長"
                  className="duration-image"
                />
                <span className="duration"> {length}小時</span>
              </div>
              <div className="course-lessons">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7edc804c22425366cdf141d0bbb568563dd1e41c3e6dcb24b9c75c37810df947?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                  alt="課時數"
                  className="lessons-image"
                />
                <span className="lessons">{sales}</span>
              </div>
            </div>
            <div className="course-price-container">
              <span className="course-price">NT$ {price}</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63b958d31f22ceac9729085dc4ee70e1cc6d5a2dab24fdc0543dd3b1c72eac0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                alt="加入購物車"
                className="cart-image"
              />
            </div>
          </div>
        </article>
        <style jsx>{`
          .course-container {
            background-color: #fff;
            display: flex;
            gap: 8px;
            font-size: 13px;
            font-weight: 400;
            padding: 10px;
          }
          .course-image {
            aspect-ratio: 1;
            object-fit: cover;
            width: 120px;
            max-width: 100%;
            margin: auto 0;
          }
          .course-details {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            padding: 0 20px;
          }
          .course-title {
            color: var(--dark, #1d1d1d);
            font-family: Noto Sans TC, sans-serif;
            font-size: 16px;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .course-instructor {
            color: var(--secondary, #5a5a5a);
            margin-top: 6px;
          }
          .course-meta {
            display: flex;
            margin-top: 6px;
            gap: 12px;
            white-space: nowrap;
          }
          .rating,
          .course-duration,
          .course-lessons {
            display: flex;
            gap: 5px;
            align-items: center;
          }
          .rating-value,
          .rating-count {
            color: var(--yellow, #faad14);
          }
          .duration,
          .lessons {
            color: var(--secondary, #5a5a5a);
          }
          .course-price-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            align-items: center;
            margin-top: 6px;
          }
          .course-price {
            color: var(--dark, #1d1d1d);
            font-weight: 700;
            font-size: 18px;
          }
        `}</style>
      </Link>
    </>
  )
}
