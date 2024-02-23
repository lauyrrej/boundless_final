import { useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
// import ArticleCard from '@/components/article/article-card'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { IoIosArrowForward } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

// sidebar假資料
const sidebarData = ['全部', '技術分享', '音樂評論']

export default function ArticleList() {
  return (
    <>
      <Navbar />
      {/* wrapper */}
      <div className="wrapper pt-5">
        {/* 麵包屑 */}
        <div className="breadcrumb-wrapper">
          <ul className="d-flex align-items-center p-0 m-0">
            <IoMdHome />
            <li style={{ marginLeft: '8px' }}>樂友論壇</li>
            <IoIosArrowForward />
            <li style={{ marginLeft: '8px' }}>文章內文</li>
          </ul>
        </div>
        {/* site map */}
        <div className="article-content container pt-3 pb-5">
          {/* nav-category */}
          <div className="nav-category">
            <div className="navLeft" />
            <div className="navRight d-flex">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  文章種類
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      技術
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      樂評
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      公告
                    </a>
                  </li>
                </ul>
              </div>
              <button type="button" className="btn">
                最新文章
              </button>
              <button type="button" className="btn">
                熱門文章
              </button>
              <button type="button" className="btn">
                留言評論
              </button>
              <button type="button" className="btn">
                QA問答
              </button>
            </div>
          </div>
          {/* main */}
          <h1 className="text-center">亞細亞功夫世代介紹</h1>
          <p className="pt-2">
            前言
            <br />
            上個季度的人氣日本動畫《孤獨搖滾》，由於層出不窮的笑料、異想天開的作畫，以及高水準的音樂製作，成功獲得全球觀眾的熱烈支持，節目播畢後發行的樂團同名專輯《結束バンド》（Spotify），也迅速在各大排行榜取得銷售首位的佳績。
            <br />
            在這股熱潮之中，還有一個樂團進入，或說「重回」大眾的視野，他們便是被《孤獨搖滾》當作創作藍本，中文稱為「亞細亞功夫世代」，日本2000年代的代表性搖滾樂團ASIAN
            KUNG-FU GENERATION（以下簡稱AKG）。
            <br />
            若你和我一樣，同屬90年代初～00年代初出生的世代，即使叫不出名字，大概也曾經由《火影忍者》、《死神》和《鋼之鍊金術師》等陪伴許多人成長的經典動畫，聽過AKG製作的片頭曲。
            <br />
            但這樣的「商業搭配」(tie-in)有時就像雙面刃，雖然由動畫曝光收穫大量海內外聽眾，卻也有人印象僅停留在這幾首前期作品，甚至以為他們是專唱動畫歌的樂團，資訊來源有限的海外聽眾尤其如此。
            <br />
            米津玄師、KANA-BOON的谷口鮪、羊文學的塩塚モエカ，許多次世代的當紅音樂人，都曾表明自己受AKG影響；台灣樂團滅火器，也曾在2020年和主唱兼吉他手的後藤正文，合作〈The
            Light〉（MV）一曲。如今難得《孤獨搖滾》引起許多人對AKG的興趣，打鐵趁熱，就用這次專題扭轉其動畫樂團的印象吧。
            <br />
            我將用上中下三篇文章介紹AKG，上篇先從成團背景和團員的特色、演奏風格以及音樂根源說起；中篇將延伸上篇所提的特色，用綜合觀點看待這些元素如何在樂團中組合，發揮獨一無二的效果；下篇則會考慮各位讀者接觸搖滾樂的程度，根據口味濃淡推薦幾張專輯，並以此解說作風流變。
            <br />
            <br />
            撰文：王小明 <br />
            圖片來源：Ernie Ball、Ibanez 官方網站
          </p>
          <div className='main-img'>
            <Image src="/article/music.png" alt="" className="big-pic object-fit-cover w-100" responsive fill />
          </div>
          <div className="article-label d-flex pt-4 ps-3">
            <div className="bg-dark text-light pt-1 pb-1 ps-2 pe-2 me-3">標籤</div>
            <div className="pt-1 pb-1 ps-2 pe-2">七弦吉他</div>
            <div className="pt-1 pb-1 ps-2 pe-2">吉他</div>
          </div>
          {/* Reader Comment */}
          <h3 className="pt-5 text-primary">讀者留言</h3>
          <div className="reader-comment pt-3 d-flex align-items-center">
            <Image
              className="article-author"
              src="/article/empty.png"
              alt="空的圖"
              width={50}
              height={50}
            />
            <span className="ps-3 info-p text-primary">作者</span>
            <span className="ps-2 info-p text-secondary">2023/11/27</span>
          </div>
          <p className="pt-1">
            上完全部課程後覺得幸好自己做了這個決定，因為以初學者會使用到的功能其實兩款軟體跟控制器都全部支援，頂多就是一些按鍵配置不太一樣，完全不影響學習跟練習。
          </p>
          <div className="reader-like d-flex justify-content-between">
            <div />
            <div className="d-flex align-items-center">
              <div>1人認同</div>
              <button type="button" className="btn btn-outline-primary ms-1">
                <i className="fa-solid fa-thumbs-up" />
                認同
              </button>
            </div>
          </div>
        </div>
        {/* 最後textarea */}
        <div className='ps-3 pe-3'>
          <textarea
            className="form-control"
            rows={5}
            placeholder="發表文章評語...(限50字)"
            defaultValue={""}
          />
          <div className="text-end mt-2 mb-3">
            <button className="btn btn-primary" type="submit">
              發表
            </button>
          </div>
        </div>
      </div>
      {/* End content */}

      {/* footer */}
      <Footer />

      <style jsx>{`
      .nav-category{
        display: flex;
        justify-content: between;
      }
      @media screen and (max-width: 576px) {
        .nav-category{
          display: none;
        }
      }
      h1{
        padding-top:5;
      }
      @media screen and (max-width: 576px) {
        h1{
          padding-top:0;
        }
      }
      .breadcrumb-wrapper{
        margin-top: 50px;
        margin-left: 50px;
      }
      @media screen and (max-width: 576px) {
        .breadcrumb-wrapper{
          margin-top: 30px;
          margin-left: 10px;
        }
      }
      .main-img{
        position: relative;
        weight: 1000px;
        height: 500px;
      }
      .big-pic{
        position: absolute;
        top: 0;
        left:0;
      }
      @media screen and (max-width: 576px) {
        .main-img{
          weight: 576px;
          height: 300px;
        }
      }
      `}</style>
    </>
  )
}
