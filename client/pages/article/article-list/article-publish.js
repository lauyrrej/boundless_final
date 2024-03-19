import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
import { debounce } from 'lodash'
// sweetalert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//data
import CityCountyData from '@/data/CityCountyData.json'
import playerData from '@/data/player.json'

const mySwal = withReactContent(Swal)

export default function Publish() {
  // ----------------------表單  ----------------------

  // ---------------------- 標題 ----------------------
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [titleCheck, setTitleCheck] = useState(true)
  const [img, setImg] = useState('')
  // 文章分類
  const [category_id, setCategory] = useState(true)

  // ---------------------- 文章摘要 ----------------------
  const [content, setContent] = useState('')
  const [descriptionCheck, setDescriptionCheck] = useState(true)
  // 表單完成狀態 0: 有欄位尚未填寫或不符規定, 1: 填寫完成, 2: 填寫中
  const [complete, setComplete] = useState(2)
  // 檢查不雅字詞
  const checkBadWords = debounce(() => {
    const badWords = /幹|屎|尿|屁|糞|靠北|靠腰|雞掰|王八|你媽|妳媽|淫/g
    setTitleCheck(title.search(badWords) < 0 ? true : false)
    setDescriptionCheck(content.search(badWords) < 0 ? true : false)
    // 檢查 主旨/條件/描述
  }, 250)
  // 檢查表單是否填妥
  const checkComplete = () => {
    if (titleCheck === false || title === '') {
      setComplete(0)
      return false
    }
    if (category_id === '') {
      setComplete(0)
      return false
    }
    if (img === '') {
      setComplete(0)
      return false
    }
    if (descriptionCheck === false || content === '') {
      setComplete(0)
      return false
    }
    setComplete(1)
    return true
  }
  const sendForm = async (title, category_id, content, img) => {
    if (!checkComplete()) {
      return false
    }
    let formData = new FormData()
    formData.append('title', title)
    formData.append('category_id', category_id)
    formData.append('content', content)
    formData.append('img', img)

    // 確認formData內容
    for (let [key, value] of formData.entries()) {
      // console.log(`${key}: ${value}`)
    }
    const res = await fetch(
      'http://localhost:3005/api/article/article-list/article-publish',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    )
    const result = await res.json()
    if (result.status === 'success') {
      notifySuccess(result.auid)
    } else {
      console.log(result.error)
    }
  }
  // 發起成功後，彈出訊息框，並跳轉到資訊頁面
  const notifySuccess = (auid) => {
    mySwal
      .fire({
        position: 'center',
        icon: 'success',
        iconColor: '#1581cc',
        title: '發起成功，將為您跳轉到資訊頁',
        showConfirmButton: false,
        timer: 3000,
      })
      .then(
        setTimeout(() => {
          router.push(`/article/article-list/${auid}`)
        }, 3000)
      )
  }
  // ---------------------- 偵測表單輸入變化，並執行檢查
  useEffect(() => {
    // 跳出未填寫完畢警告後再次輸入，消除警告
    setComplete(2)
    // 檢查不雅字詞
    checkBadWords.cancel() // 取消上一次的延遲
    checkBadWords()
  }, [title, category_id, content, img])

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
            {/* setting title */}
            <div className="set-rwd">
              <div className="rwd-title">
                <h3>自訂文章標題</h3>
              </div>
              <div className="rwd-content">
                <h5 className="text-secondary">
                  上限15個字，系統已經先擷取，你也可以自行修改標題。(
                  {title.length}/15)
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
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                    placeholder="輸入內容..."
                    maxLength={15}
                    defaultValue={''}
                  />
                </div>
                {titleCheck ? (
                  ''
                ) : (
                  <div className="bad-words">偵測到不雅字詞</div>
                )}
              </div>
            </div>
            <hr />
            {/* setting category */}
            <div className="set-rwd">
              <div className="rwd-title">
                <h3>設定文章分類</h3>
              </div>
              <div className="rwd-content">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                  value={category_id}
                >
                  <option value={1}>樂評</option>
                  <option value={2}>技術</option>
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
                  系統已經先擷取，你也可以自行修改摘要說明。
                </h5>
                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  ></label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows={3}
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                    placeholder="輸入內容..."
                    defaultValue={''}
                  />
                </div>
                {descriptionCheck ? (
                  ''
                ) : (
                  <div className="bad-words">偵測到不雅字詞</div>
                )}
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
                  <input
                    className="form-control"
                    type="file"
                    name="myFile"
                    src={img}
                    id="myFile"
                    onChange={(e) => {
                      setImg(e.target.value)
                    }}
                  />
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
            {/* setting publish */}
            <div className="set-rwd">
              <div className="rwd-title">
                <h3>選擇發布方式</h3>
              </div>
            </div>
            {/* form-check */}
            <div className="form-check123">
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
            <div className="form-check123">
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
            <div className="form-check123">
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
            <div className="form-check123">
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
              <button
                onClick={() => {
                  sendForm(title, category_id, content, img)
                }}
                type="button"
                className="btn btn-primary"
              >
                確認更新
              </button>
            </div>
          </div>
          {complete === 0 ? (
            <div
              className="d-flex bad-words justify-content-center"
              style={{ marginTop: '-8px' }}
            >
              <div>請遵照規則，並填寫所有必填內容</div>
            </div>
          ) : (
            ''
          )}
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
        .bad-words {
          color: red;
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