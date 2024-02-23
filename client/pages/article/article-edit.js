import React, { useState, useEffect } from "react";
import Editor from "./test";
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import ArticleCard from '@/components/article/article-card'
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

export default function ArticleEdit() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const initContent = "JSON text 段落與標題需要分開編輯";

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

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
          <Editor
            name="description"
            onChange={(data) => {
              setData(data);
            }}
            editorLoaded={editorLoaded}
            value={initContent}
          />
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
