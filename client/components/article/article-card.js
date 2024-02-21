import React from 'react'

export default function Articlecard() {
  return (
    <>
      <div className="article-card">
        {/* info區塊 */}
        <div className="article-info d-flex justify-content-between align-items-center mb-3">
          <img className="article-author" src="/article/empty.png" alt="空的圖" />
          <span className="info-p text-secondary">作者</span>
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
            src="/client-test/components/images/empty.png"
            alt=""
          />
        </div>
        {/* views-like */}
        <div className="views-like d-flex">
          <div className="views d-flex">
            <i className="fa-solid fa-eye text-secondary" />
            <p className="text-secondary ms-1">50</p>
          </div>
          <div className="saves d-flex ms-4">
            <i className="fa-solid fa-bookmark text-secondary" />
            <p className="text-secondary ms-1">50</p>
          </div>
        </div>
        {/* kind-bookmark */}
        <div className="kind-bookmark d-flex justify-content-between align-items-center">
          <div className="article-kind text-black bg-body px-2 pt-1 pb-1">技術</div>
          <div className="bookmark">
            <i className="fa-regular fa-bookmark text-primary" />
          </div>
        </div>
      </div>
    </>
  )
}
