import { useEffect, useState } from 'react'
import Lesson from '@/data/Lesson.json'

export default function CourseCard() {
  // 注意1: 初始值至少要給空陣列
  // 注意2: 應用程式執行期間，要保持狀態的資料類型一致
  // 建議在開發時，使用陣列樣貌的範例資料，或使用註解
  const [products, setProducts] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  // 向伺服器要求資料，設定到狀態中用的函式

  const getProducts = async () => {
    try {
        const data = Lesson;

      console.log(data)

      // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
      // 進入狀態前檢查資料類型為陣列，以避免錯誤
      //如果不是陣列就不進入狀態
      if (Array.isArray(data)) {
        setProducts(data)

        // 關閉載入動畫
        // 因載入時間太短所以看不到動畫，至少撥放2秒再關閉
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 初次渲染"之後(After)"，向伺服器要求資料，設定到狀態中

  useEffect(() => {
    getProducts()
  }, [])

  console.log('render')

  return (
    <>
      <article className="course-card">
        <section className="course-image-wrapper">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7714ac15cb7337bab3fdd53e00644245f4a840747cf1ecc2bc44e48164d588a?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
            alt="Course Preview"
            className="course-image"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63b958d31f22ceac9729085dc4ee70e1cc6d5a2dab24fdc0543dd3b1c72eac0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
            alt=""
            className="icon-image"
          />
        </section>
        {products.map((v, i) => {
          return (
            <section className="courset-details" key={v.id}>
              <h3 className="course-title">{v.name}</h3>
              <p className="course-instructor">by {v.teacher_id}老師</p>
              <div className="course-info">
                <div className="rating">
                  <img
                    loading="lazy"
                    src={`/課程與師資/lesson_img/{v.img}`}
                    alt="Rating stars"
                    className="rating-stars"
                  />
                  <span className="rating-value">4.9</span>
                  <span className="review-count">(3)</span>
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
          )
        })}
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
        }

        .course-details {
          display: flex;
          flex-direction: column;
          color: #1d1d1d;
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
