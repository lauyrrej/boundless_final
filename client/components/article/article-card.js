import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import bookmarkIconFill from '@/assets/fillbookmark.svg'
import bookmarkIcon from '@/assets/emptybookmark.svg'
import { FaBookmark } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export default function Articlecard({
  id,
  auid,
  title,
  user_id,
  content,
  img,
  published_time,
  fav,
  handleToggleFav,
  category_id,
}) {
  const [discount, setDiscount] = useState('1')
  // console.log(products)

  // // 擴充收藏功能
  // const initState = data.map((v, i) => {
  //   return { ...v, fav: false }
  // })
  // // 擴充後的物件陣列作為初始值
  // const [articles, setArticles] = useState(initState)

  // // 純func
  // const handleToggleFav = (id) => {
  //   const newArticles = articles.map((v, i) => {
  //     if (v.id === id) return { ...v, fav: !v.fav }
  //     else return v
  //   })
  //   setArticles(newArticles)
  // }

  // 組合日期8
  const createdYear = new Date(published_time).getFullYear()
  // console.log(createdYear)
  const createdMonth = new Date(published_time).getMonth() + 1
  const createdDate = new Date(published_time).getDate()
  const combineDate = `${createdYear}-${createdMonth}-${createdDate}`
  console.log(combineDate)

  return (
    <>
      <Link href={`/article/${auid}`}>
        <div className="article-card">
          {/* info區塊 */}
          <div
            className="article-info d-flex 
        justify-content-between align-items-center mb-3"
          >
            <img
              className="article-author"
              src="/article/empty.png"
              alt="空的圖"
            />
            <span className="info-p text-secondary">{user_id}</span>
            <span className="info-p text-secondary">{combineDate}</span>
          </div>
          {/* article區塊 */}
          <div className="content d-flex">
            <div className="text me-1">
              <h5 className="fw-bold clamped-text">{title}</h5>
              <p className="text-secondary">{content}</p>
            </div>
            <img className="article-image" src={`/article/${img}`} alt="" />
          </div>
          {/* views-like */}
          <div className="views-like d-flex">
            <div className="views d-flex">
              <FaEye />
              <p className="text-secondary ms-1">50</p>
            </div>
            <div className="saves d-flex ms-4">
              <FaBookmark />
              <p className="text-secondary ms-1">50</p>
            </div>
          </div>
          {/* kind-bookmark */}
          <div className="kind-bookmark d-flex justify-content-between align-items-center">
            <div className="article-kind text-black bg-body px-2 pt-1 pb-1">
              {category_id}
            </div>
            <div className="bookmark">
              <Image
                src={fav ? bookmarkIconFill : bookmarkIcon}
                alt=""
                width={25}
                height={25}
                onClick={() => {
                  handleToggleFav(id)
                }}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .article-card {
            width: 525px;
            height: 238px;
             {
              /* background-color: rgb(239, 184, 184); */
            }
            padding: 10px;
          }
          @media screen and (max-width: 576px) {
            .article-card {
              width: 100%;
              height: 100px;
              padding-bottom: 250px;
            }
          }
          .article-info {
            width: 180px;
          }
          .article-author {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .clamped-text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2;
          }
          .info-p {
            font-family: 'Noto Sans TC', sans-serif;
          }
          .text {
            width: 339px;
            height: 112px;
          }
          .text p {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .article-image {
            width: 162px;
            height: 102px;
            border-radius: 5%;
            object-fit: cover;
          }
          @media screen and (max-width: 576px) {
            .article-img {
              width: 30px;
            }
          }
          .views-like p {
            font-size: small;
          }
          .bookmark {
            width: 50px;
          }
        `}</style>
      </Link>
    </>
  )
}
