import React from 'react'

export default function ProductBriefCard({}) {
  return (
    <>
      <div className="Right sticky-top ">
        <div className="prodBriefing sticky-top ">
          <div className="prodMainName">Orange Micro Terror</div>
          <div className="Rating">
            <div className="star">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84522f0e347edba7963eb335fd5301feca031f8d880bba21dd9760a01286c3a5?"
                className="starImg"
              />
              <div className="ratingNumber">4.9</div>
              <div className="commentNumber">(3)</div>
            </div>
            <div className="sales">已售出 10</div>
          </div>
          <div className="productPrice">
            <div className="price">NT$ 22,680</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed2e715f1421a33de89ac321d6dcc6d56fbac40a7d43dfe2cf0ecb15054bd3f?"
              className="likesIcon"
            />
          </div>
          <div className="Intro">
            小巧的放大器，巨大的音色。
            <br />
            <br /> Micro Terror是一種全球現象。從最初的 Tiny Terror
            中汲取靈感，這個微型怪物將一個閥門前置放大器連接到一個固態輸出部分，以獲得巨大的音調，使其小型框架成為一種嘲弄。
            <br />
            <br />
            Micro Terror 重量不到 1
            公斤，可以說是市場上最便攜的放大器頭。與配套的 PPC108
            機櫃搭配使用時，Micro Terror 的 Aux
            輸入和耳機輸出使其成為完美的練習夥伴，即使是最雜亂的餐具櫃也足夠小。
            然而，不要被它的微型足跡所迷惑，因為尺寸是這款放大器唯一的小問題。Micro
            Terror 採用高強度鋼外殼，按照與 Terror
            系列其他產品相同的高標準製造，配備單個 ECC83 (12AX7)
            前置放大器閥，並與固態功率放大器耦合。這個小東西發出的聲音深度（和音量）確實令人震驚，橙色的咆哮和咬合聲很豐富。更重要的是，Micro
            Terror 可以與任何 8-16 歐姆音箱一起使用。
          </div>

          {/* 數量選擇器 */}
          <div className="quantitySelector ">
            <div className="btn decrease-btn">-</div>
            <div className="quantity">1</div>
            <div className="btn increase-btn">+</div>
            <h6 className="ms-4">暫無庫存</h6>
          </div>
          {/*  */}
          <div className="shoppingBtn">
            <div className="cartBtn">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c240e4bc8653fe6179383ea22f1eb80902c70eec255a944e9d8e0efbf823c4e3?"
                className="cartIcon"
              />
              <div className="cart">加入購物車</div>
            </div>
            <div className="buyBtn">
              <div className="buy">立即購買</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .Right {
             {
              /* margin-left: 80px; */
            }
          }

          .prodBriefing {
            /* background-color: #ff9595; */
            margin-left: 45px;
            top: 120px;
          }
          .prodMainName {
            color: var(--dark, #1d1d1d);
            /* font: 700 40px Noto Sans TC, sans-serif; */
            font-weight: 700;
            font-size: 40px;
          }
          /*  */
          .font-family {
            font-family: Noto Sans TC, sans-serif;
          }
          /*  */

          .Rating {
            justify-content: space-between;
            display: flex;
            margin-top: 10px;
            width: 100%;
            gap: 20px;
            font-weight: 400;
          }

          .star {
            justify-content: center;
            align-items: center;
            display: flex;
            gap: 10px;
            white-space: nowrap;
          }

          .ratingNumber {
            color: var(--yellow, #faad14);
            align-self: stretch;
            font: 24px Noto Sans TC, sans-serif;
          }

          .commentNumber {
            color: var(--body, #b9b9b9);
            align-self: stretch;
            flex-grow: 1;
            margin: auto 0;
            font: 16px Noto Sans TC, sans-serif;
          }
          .sales {
            color: var(--secondary, #5a5a5a);
            margin: auto 0;
            font: 16px Noto Sans TC, sans-serif;
          }
          .productPrice {
            justify-content: space-between;
            display: flex;
            margin-top: 10px;
            gap: 20px;
          }
          .price {
            color: var(--dark, #1d1d1d);
            white-space: nowrap;
            padding: 9px 21px 2px 0;
            font: 700 28px Noto Sans TC, sans-serif;
          }
          .likesIcon {
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            border: 1px solid var(--body, #b9b9b9);
            display: flex;
            aspect-ratio: 1;
            width: 34px;
            height: 34px;
            margin: auto 0;
            padding: 0 7px;
          }
          .quantitySelector {
            display: flex;
            align-items: center;
            margin-top: 20px;
          }
          .decrease-btn {
            height: 40px;
            width: 40px;
            border-radius: 5px 0px 0px 5px;
            border: 1px solid var(--body, #b9b9b9);
          }
          .quantity {
            display: flex;
            width: 78px;
            height: 40px;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--body, #b9b9b9);
          }
          .increase-btn {
            color: white;
            height: 40px;
            width: 40px;
            border-radius: 0px 5px 5px 0px;
            background: var(--body, #b9b9b9);
          }
          .shoppingBtn {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            gap: 12px;
            font-size: 16px;
            color: var(--white, #fff);
            font-weight: 700;
          }
          .cartBtn {
            display: flex;
            justify-content: space-between;
            border-radius: 5px;
            background-color: var(--body, #b9b9b9);
            gap: 12px;
            padding: 8px 78px;
            flex: 1 0 0;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
            }
          }
          .buyBtn {
            display: flex;
            justify-content: center;
            border-radius: 5px;
            background-color: #18a1ff;
            gap: 12px;
            padding: 8px 78px;
            flex: 1 0 0;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              background-color: #000000;
             
            }
          }
        `}
      </style>
    </>
  )
}
