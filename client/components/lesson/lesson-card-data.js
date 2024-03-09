import { useEffect, useState } from 'react'
import Link from 'next/link'
// import Lesson from '@/data/Lesson.json'

// icon
import { FaStar } from 'react-icons/fa'
import { GoClock } from 'react-icons/go'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { FaHeart } from 'react-icons/fa'

export default function CourseCard({ luid, name, price, teacher_id, img, length, sales,discount}) {
    //  const [isDiscount, setIsDiscount] = useState(false)
  return (
    <>
      <Link href={`/lesson/${luid}`}>
        <article className="course-card">
          <section className="course-image-wrapper">
            <img
              loading="lazy"
              src={`/課程與師資/lesson_img/${img}`}
              alt="Course Preview"
              className="course-image"
            />
                      <FaHeart className="icon-image" color="#B9B9B9" size={24} style={{position:'absolute', bottom: '12px',
            right: '12px'} } />
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63b958d31f22ceac9729085dc4ee70e1cc6d5a2dab24fdc0543dd3b1c72eac0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
              alt=""
              className="icon-image"
            /> */}
          </section>

          <section className="course-details">
            <h3 className="course-title mb-1">{name}</h3>
            <p className="course-instructor">by {teacher_id}老師</p>
            <div className="course-info">
              <div className="rating">
                <FaStar size={18} color="#faad14" className="rating-stars" />

                <span className="rating-value">4.9</span>
                <span className="review-count">(3)</span>
              </div>
              <div>
                <span className="duration-time">
                  <GoClock
                    size={16}
                    color="#5a5a5a"
                    className="duration-icon"
                  />
                  {length}小時
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
                <div>NT$ {price}</div>
              </div>
            )} */}
          </section>
          <div className="enrolled-students">
            <MdOutlinePeopleAlt
              size={16}
              color="#5a5a5a"
              alt="User icon"
              className="user-icon"
            />

            <span className="enrollment-count">{sales}</span>
          </div>
        </article>

        <style jsx>{`
          .course-card {
            position: relative;
            width: 240px;
            height: 403px;
             {
              /* 保證卡片高度和內容一致 */
            }
            border-radius: 5px;
            border: 1px solid #b9b9b9;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 8px;
          }
          .course-image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            position: relative;
            aspect-ratio: 1.33;
            width: 100%;
            height: 166px; /*設定希望高度 */
          }
          .course-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
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

          .course-price {
            font-size: 18px;
            font-family: Noto Sans TC, sans-serif;
            font-weight: 700;
            height: 60px;
          }
          .enrolled-students {
            position: absolute;
            right: 10px;
            bottom: 10px;
            color: #5a5a5a;
            font-size: 14px;
            font-family: Noto Sans TC, sans-serif;
          }
          /* Add your existing styles here */
        `}</style>
      </Link>
    </>
  )
}
