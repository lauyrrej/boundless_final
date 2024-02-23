import { useState } from 'react'
import Image from 'next/image';
import Breadcrumb from '@/components/article/breadcrumb'
import { IoCloseOutline } from "react-icons/io5";
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

export default function ArticlePublish() {
  return (
    <>
      {/* wrapper */}
      <div className="wrapper pt-5">
        {/* 麵包屑 */}
        <div className="breadcrumb-wrapper m-0 p-0">
          <ul className="d-flex align-items-center p-0 m-0">
            <IoMdHome />
            <li style={{ marginLeft: '8px' }}>樂友論壇</li>
            <IoIosArrowForward />
            <li style={{ marginLeft: '8px' }}>文章資訊</li>
          </ul>
        </div>
        {/* XLg */}
        <div className="x-lg text-end pb-3">
          <IoCloseOutline size={50} />
        </div>
        {/* setting category */}
        <div className="set-category d-flex justify-content-between row">
          <div className="col-4">
            <h3>設定文章分類</h3>
          </div>
          <div className="col-8">
            <select className="form-select" aria-label="Default select example">
              <option value={1}>技術</option>
              <option value={2}>樂評</option>
              <option value={3}>公告</option>
            </select>
          </div>
        </div>
        <hr />
        {/* setting content */}
        <div className="set-rwd">
          <div className="rwd-title">
            <h3>自訂文章摘要</h3>
          </div>
          <div className="rwd-content">
            <h5 className="text-secondary">
              上限150個字，系統已經先擷取，你也可以自行修改摘要說明。(140/150)
            </h5>
            <div>
              <label htmlFor="exampleFormControlTextarea1" className="form-label" />
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="輸入內容..."
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <hr />
        {/* setting img */}
        <div className="set-rwd">
          <div className="rwd-title">
            <h3>自訂文章縮圖</h3>
          </div>
          <div className="rwd-content">
            <h5 className="text-secondary">
              選擇或上傳照片作為文章縮圖(同時也是社群分享文章連結時的縮圖)。
            </h5>
            <div className="upload-img d-flex align-items-center mt-4">
              <Image src="/article/singer.png" alt="" width={150} height={150} />
              <h5 className="text-secondary ms-5">上傳圖片</h5>
            </div>
            <h5 className="text-secondary mt-4">
              建議尺寸: 寬1200 x 高630 像素的等比例圖片 <br />
              大小限制: 5 MB
              <br />
              格式限制: jpeg(jpg) 、 PNG 、GIF
            </h5>
          </div>
        </div>
        <hr />
        {/* setting tag */}
        <div className="set-rwd">
          <div className="rwd-title">
            <h3>自訂文章摘要</h3>
          </div>
          <div className="rwd-content">
            <h5 className="text-secondary">
              設定關鍵字，讓文章更容易被讀者搜尋跟瀏覽
              <br />
              <br />
              請按 Enter鍵進行分隔 最多4個
            </h5>
            <br />
            <br />
            <div className="tag-btns">
              <button type="button" className="btn btn-outline-secondary">
                標籤1
                <i className="fa-solid fa-circle-xmark ms-2" />
              </button>
              <button type="button" className="btn btn-outline-secondary">
                標籤1
                <i className="fa-solid fa-circle-xmark ms-2" />
              </button>
              <button type="button" className="btn btn-outline-secondary">
                標籤1
                <i className="fa-solid fa-circle-xmark ms-2" />
              </button>
              <button type="button" className="btn btn-outline-secondary">
                標籤1
                <i className="fa-solid fa-circle-xmark ms-2" />
              </button>
              <button type="button" className="btn btn-outline-secondary">
                標籤1
                <i className="fa-solid fa-circle-xmark ms-2" />
              </button>
            </div>
          </div>
        </div>
        <hr />
        {/* setting publish */}
        <div className="set-rwd">
          <div className="rwd-title">
            <h3>選擇發布方式</h3>
          </div>
        </div>
        {/* form-check */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            立刻發佈
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            私密發佈(僅取得連結的使用者可以看到文章)
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            排程發佈
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            儲存成草稿
          </label>
        </div>
        {/* pagination */}
        <div className="page-button d-flex justify-content-between pt-5 pb-4">
          <button type="button" className="btn">
            上一步
          </button>
          <button type="button" className="btn btn-primary">
            確認更新
          </button>
        </div>
      </div>
      {/* End content */}
      <style jsx>{`
      .wrapper {
        min-height: calc(100vh);
        padding: 0 35px;
      }
      .set-content button {
        background-color: white;
        color: var(--secondary);
        font-weight: 500;
        border-color: var(--secondary);
        border-width: 2px;
      }
      /* set-content,set-img, set-tag */
      .set-rwd{
    display: flex;
    flex-direction: row;
}
.rwd-title{
    width: calc(60%);
}
.rwd-content{
    width: calc(60%);
}
.tag-btns{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .btn{
        margin-right: 20px;
    }
}
@media screen and (max-width: 576px) {
    .set-rwd{
        flex-direction: column;
    }
    .rwd-title{
        width: 100%;
    }
    .rwd-content{
        width: 100%;
    }
}
      `}</style>
    </>
  )
}
