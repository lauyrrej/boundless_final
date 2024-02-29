import React, { useState, useEffect } from 'react'
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
      <article className="course-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28328ea21320ffbd66482e6e038e06bc64da9e64f1ec138655dad79fb7b2925a?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
          alt="樂理指法一把抓 - 鋼琴基礎從零開始的封面"
          className="course-image"
        />
              {/* 試跑迴圈抓資料 */}
         
        {products.map((v, i) => {
            return (
              <div className="course-details"  key={i}>
                <h2 className="course-title">
                  樂理指法一把抓 - 鋼琴基礎從零開始
                </h2>
                <p className="course-instructor">by XX老師</p>
                <div className="course-meta">
                  <div className="rating">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8287886cc0f8e59d93376690dc57f4af99a9e899badb88e0d2ed47fdb08d035?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                      alt="評分"
                      className="rating-image"
                    />
                    <span className="rating-value">4.9</span>
                    <span className="rating-count">(3)</span>
                  </div>
                  <div className="course-duration">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/65fa44297b430826617ac8cc6a4cf7e2cf251e32574954239a3cb8b5c74c8ca0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                      alt="時長"
                      className="duration-image"
                    />
                    <span className="duration">5小時</span>
                  </div>
                  <div className="course-lessons">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7edc804c22425366cdf141d0bbb568563dd1e41c3e6dcb24b9c75c37810df947?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                      alt="課時數"
                      className="lessons-image"
                    />
                    <span className="lessons">50</span>
                  </div>
                </div>
                <div className="course-price-container">
                  <span className="course-price">NT$ 22,680</span>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63b958d31f22ceac9729085dc4ee70e1cc6d5a2dab24fdc0543dd3b1c72eac0?apiKey=8130f93a2c9b4a89bbf1aefc4624aa21&"
                    alt="加入購物車"
                    className="cart-image"
                  />
                </div>
              </div>
            )
        })}
                   
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
    </>
  )
}
