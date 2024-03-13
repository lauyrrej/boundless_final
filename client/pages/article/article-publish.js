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
import { debounce } from 'lodash'
// sweetalert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//data
import CityCountyData from '@/data/CityCountyData.json'
import playerData from '@/data/player.json'
import genreData from '@/data/genre.json'

export default function Publish() {
  // ----------------------設定字數15, 150---------------
  const [topic, setTopic] = useState('')
  const [text, setText] = useState('')
  const maxLength = 150

  const handleTitleChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= maxLength) {
      setTopic(inputValue)
    }
  }
  const handleTextChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= maxLength) {
      setText(inputValue)
    }
  }

  // ----------------------表單  ----------------------
  // ---------------------- 標題 ----------------------
  const [title, setTitle] = useState('')
  const [titleCheck, setTitleCheck] = useState(true)
  // ---------------------- 技術程度
  const [degree, setDegree] = useState('')

  // ---------------------- 曲風 ----------------------
  // 儲存選擇的曲風
  const [genre, setgenre] = useState([])
  const [genreCheck, setGenreCheck] = useState(true)
  // 變更曲風下拉選單的數量時，陣列會多一個元素
  const [genreSelect, setgenreSelect] = useState([1])
  // 實際使用的曲風陣列，避免使用者未照順序新增樂手
  const [finalgenre, setFinalgenre] = useState('')

  // ---------------------- 擔任職位 ----------------------
  // 控制表單狀態
  const [myPlayer, setMyPlayer] = useState('')
  // 表單實際送出的內容
  const [finalMyPlayer, setFinalMyPlayer] = useState('')
  // console.log(finalMyPlayers)

  // ---------------------- 徵求樂手 ----------------------
  const [players, setplayers] = useState([])
  const [playersSelect, setPlayersSelect] = useState([1])
  // 實際使用的樂手陣列，避免使用者未照順序新增樂手
  const [finalPlayers, setFinalPlayers] = useState([])

  // ---------------------- 篩選城市用的資料 ----------------------
  const cityData = CityCountyData.map((v, i) => {
    return v.CityName
  }).filter((v) => {
    return v !== '釣魚臺' && v !== '南海島'
  })
  const [region, setRegion] = useState('')

  // ---------------------- 其他條件 ----------------------
  const [condition, setCondition] = useState('')
  const [conditionCheck, setConditionCheck] = useState(true)
  // ---------------------- 描述 ----------------------
  const [description, setDescription] = useState('')
  const [descriptionCheck, setDescriptionCheck] = useState(true)
  // 表單完成狀態 0: 有欄位尚未填寫或不符規定, 1: 填寫完成, 2: 填寫中
  const [complete, setComplete] = useState(2)
  // 檢查不雅字詞
  const checkBadWords = debounce(() => {
    const badWords = /幹|屎|尿|屁|糞|靠北|靠腰|雞掰|王八|你媽|妳媽|淫/g
    setTitleCheck(title.search(badWords) < 0 ? true : false)
    setConditionCheck(condition.search(badWords) < 0 ? true : false)
    setDescriptionCheck(description.search(badWords) < 0 ? true : false)
  }, 250)
  // 檢查是否重複填寫曲風
  const checkGenre = debounce(() => {
    const genreSet = new Set(genre) // 建立 set 物件，該物件中的每個屬性都是唯一值
    // 若長度不同，則代表陣列中有重複的值
    if (genre.length !== genreSet.size) {
      setGenreCheck(false)
    } else {
      setGenreCheck(true)
    }
  }, 250)
  // 檢查表單是否填妥
  const checkComplete = () => {
    if (titleCheck === false || title === '') {
      setComplete(0)
      return false
    }
    if (degree === '') {
      setComplete(0)
      return false
    }
    if (genreCheck === false || finalgenre === '') {
      setComplete(0)
      return false
    }
    if (finalMyPlayer === '') {
      setComplete(0)
      return false
    }
    if (finalPlayers === '') {
      setComplete(0)
      return false
    }
    if (region === '') {
      setComplete(0)
      return false
    }
    if (conditionCheck === false) {
      setComplete(0)
      return false
    }
    if (descriptionCheck === false || description === '') {
      setComplete(0)
      return false
    }
    setComplete(1)
    return true
  }
  const sendForm = async (
    uid,
    title,
    degree,
    finalgenre,
    finalMyPlayer,
    finalPlayers,
    region,
    condition,
    description
  ) => {
    if (!checkComplete()) {
      return false
    }
    let formData = new FormData()
    formData.append('uid', uid)
    formData.append('title', title)
    formData.append('degree', degree)
    formData.append('genre', finalgenre)
    formData.append('former', finalMyPlayer)
    formData.append('players', finalPlayers)
    formData.append('region', region)
    formData.append('condition', condition)
    formData.append('description', description)
    // 確認formData內容
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }
    const res = await fetch('http://localhost:3005/api/jam/form', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      notifySuccess(result.juid)
    } else {
      console.log(result.error)
    }
  }
  // 發起成功後，彈出訊息框，並跳轉到資訊頁面
  const notifySuccess = (juid) => {
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
          router.push(`/jam/recruit-list/${juid}`)
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
    // 檢查無重複的曲風
    checkGenre.cancel()
    checkGenre()
    // 把曲風&徵求樂手轉換成表單實際接收的字串格式
    const fgArr = genre.filter((v) => v != (null || undefined))
    setFinalgenre(`[${fgArr.toString()}]`)
    const fpArr = players.filter((v) => v != (null || undefined))
    setFinalPlayers(`[${fpArr.toString()}]`)
    // 檢查表單是否完成
  }, [title, degree, genre, myPlayer, players, region, condition, description])

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
                  {topic.length}/15)
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
                    onChange={handleTitleChange}
                    placeholder="輸入內容..."
                    maxLength={15}
                    defaultValue={''}
                  />
                </div>
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
            {/* <div className="set-rwd">
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
            <hr /> */}
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
