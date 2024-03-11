import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import jamHero from '@/assets/jam-hero.png'
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { IoCloseOutline } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import { IoMdHome } from 'react-icons/io'
import axios from 'axios'

export default function Publish() {
  // ----------------------上傳圖片  ----------------------
  // const uploadFileToServer = (file) => {
  //   // 構造 FormData 對象，用於將文件上傳到服務器
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   // 發送 POST 請求到服務器，將文件上傳
  //   return fetch('http://localhost:3005/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   }).then((response) => {
  //     // 檢查響應是否成功，如果不成功則拋出錯誤
  //     if (!response.ok) {
  //       throw new Error('File upload failed')
  //     }
  //     // 返回響應
  //     return response.json()
  //   })
  // }
  const [file, setFile] = useState()
  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post('http://localhost:3005/api/upload', formData)
      .then((response) => {
        // 檢查響應是否成功，如果不成功則拋出錯誤
        if (!response.ok) {
          throw new Error('File upload failed')
        }
        // 返回響應
        return response.json()
      })
      .catch((error) => console.log(error))
    // bug 顯示error但不知道問題在哪
  }

  // ----------------------設定字數150---------------
  const [text, setText] = useState('')
  const maxLength = 150

  const handleTextChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= maxLength) {
      setText(inputValue)
    }
  }

  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  // ----------------------假資料  ----------------------

  const [filterVisible, setFilterVisible] = useState(false)
  useEffect(() => {
    document.addEventListener('click', (e) => {
      setFilterVisible(false)
    })
  }, [])
  // 阻止事件冒泡造成篩選表單關閉
  const stopPropagation = (e) => {
    e.stopPropagation()
  }
  // 顯示表單
  const onshow = (e) => {
    stopPropagation(e)
    setFilterVisible(!filterVisible)
  }

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <div className="container position-relative">
        {/* 手機版主選單/navbar */}
        <div
          className={`menu-mb d-sm-none d-flex flex-column align-items-center ${
            showMenu ? 'menu-mb-show' : ''
          }`}
        >
          {/* 用戶資訊 */}
          <div className="menu-mb-user-info d-flex align-items-center flex-column mb-3">
            <div className="mb-photo-wrapper mb-2">
              <Image
                src="/jam/amazingshow.jpg"
                alt="user photo mb"
                fill
              ></Image>
            </div>
            <div>用戶名稱</div>
          </div>
          <Link
            className="mm-item"
            href="/user"
            style={{ borderTop: '1px solid #b9b9b9' }}
          >
            會員中心
          </Link>
          <Link className="mm-item" href="/lesson/lesson-list">
            探索課程
          </Link>
          <Link className="mm-item" href="/instrument/instrument-list">
            樂器商城
          </Link>
          <Link className="mm-item" href="/jam/recruit-list">
            Let &apos;s JAM!
          </Link>
          <Link className="mm-item" href="/article/article-list">
            樂友論壇
          </Link>
          <div className="mm-item" style={{ color: '#1581cc' }}>
            登出
            <ImExit size={20} className="ms-2" />
          </div>
        </div>
        <div className="row">
          {/* 麵包屑 */}
          <div className="breadcrumb-wrapper-ns">
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <li style={{ marginLeft: '8px' }}>樂友論壇</li>
              <FaChevronRight />
              <Link href="/article/article-list">
                <li style={{ marginLeft: '10px' }}>文章資訊</li>
              </Link>
              <FaChevronRight />
              <li style={{ marginLeft: '10px' }}>文章發布</li>
            </ul>
          </div>
          <div className="">
            {/* 主內容 */}
            {/* XLg */}
            <div className="x-lg text-end pb-3">
              <Link href={`/article/article-list`} className="icon-btn">
                <IoCloseOutline size={50} />
              </Link>
            </div>
            {/* setting category */}
            <div className="set-category d-flex justify-content-between row">
              <div className="col-4">
                <h3>設定文章分類</h3>
              </div>
              <div className="col-8">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
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
                  上限150個字，系統已經先擷取，你也可以自行修改摘要說明。(
                  {text.length}/150)
                </h5>
                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  ></label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    onChange={handleTextChange}
                    placeholder="輸入內容..."
                    maxLength={150}
                    defaultValue={''}
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
                  <Image
                    src="/article/singer.png"
                    alt=""
                    width={150}
                    height={150}
                  />
                  <form
                    action="/upload"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <input
                      type="file"
                      name="myFile"
                      id="myFile"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button type="button" onClick={upload}>
                      送出
                    </button>
                  </form>
                  {/* <h5 className="text-secondary ms-5">上傳圖片</h5> */}
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
        </div>
      </div>
      <Footer />

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
        .set-rwd {
          display: flex;
          flex-direction: row;
        }
        .rwd-title {
          width: calc(60%);
        }
        .rwd-content {
          width: calc(60%);
        }
        .tag-btns {
          display: flex;
          flex-wrap: wrap;
          justify-content: start;
          .btn {
            margin-right: 20px;
          }
        }
        @media screen and (max-width: 576px) {
          .set-rwd {
            flex-direction: column;
          }
          .rwd-title {
            width: 100%;
          }
          .rwd-content {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
