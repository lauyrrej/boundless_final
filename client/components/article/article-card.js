import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import bookmarkIconFill from '@/assets/fillbookmark.svg'
import bookmarkIcon from '@/assets/emptybookmark.svg'
import { FaBookmark } from "react-icons/fa";
import data from '@/data/article.json'
import Image from 'next/image';


export default function Articlecard() {
  const [discount, setDiscount] = useState('1')
  // console.log(products)

  // 擴充收藏功能
  const initState = data.map((v, i) => {
    return { ...v, fav: false }
  })
  // 擴充後的物件陣列作為初始值
  const [articles, setArticles] = useState(initState)

  // 純func
  const handleToggleFav = (id) => {
    const newArticles = articles.map((v, i) => {
      if (v.id === id) return { ...v, fav: !v.fav }
      else return v
    })
    setArticles(newArticles)
  }

  return (
    <>
      <div className="article-card">
        {/* info區塊 */}
        <div className="article-info d-flex 
        justify-content-between align-items-center mb-3">
          <img className="article-author" src="/article/empty.png" alt="空的圖" />
          <span className="info-p text-secondary">Joe</span>
          <span className="info-p text-secondary">2023/11/27</span>
        </div>
        {/* article區塊 */}
        <div className="content d-flex">
          <div className="text me-1">
            <h5 className="fw-bold">那些在買七弦吉他前，需要注意的調 Tone 撇步！</h5>
            <p className="text-secondary">
              說到使用七弦電吉他的樂手你會先想到誰呢？現代人想到七弦吉他常常會想到90年代
              Steve Vai、Korn樂團、Fear Factory 樂團等重金屬音樂
            </p>
          </div>
          <img
            className="article-image"
            src="/article/empty.png"
            alt=""
          />
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
          <div className="article-kind text-black bg-body px-2 pt-1 pb-1">技術</div>
          <div className="bookmark">
            {articles.map((v, i) => {
              return (
                <Image
                  src={v.fav ? bookmarkIconFill : bookmarkIcon}
                  alt=""
                  width={25}
                  height={25}
                  onClick={() => {
                    handleToggleFav(v.id)
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
      .article-card {
        width: 525px;
        height: 238px;
        {/* background-color: rgb(239, 184, 184); */}
        padding: 10px;
      }
      .article-info {
        width: 180px;
      }
      .article-author {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .info-p {
        font-family: "Noto Sans TC", sans-serif;
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
      }
      .views-like p {
        font-size: small;
      }
      .bookmark{
        width: 50px;
      }
      `}</style>
    </>
  )
}
