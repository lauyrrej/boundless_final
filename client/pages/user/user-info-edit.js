import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
//
import { debounce } from 'lodash'

//圖片
import jamHero from '@/assets/jam-hero.png'

// 會員認證hook
import { useAuth } from '@/hooks/user/use-auth'

//選項資料資料 data
import CityCountyData from '@/data/CityCountyData.json'
import playerData from '@/data/player.json'
import genreData from '@/data/genre.json'

// sweetalert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// scss
import styles from '@/pages/user/edit.module.scss'

// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa6'
import { FaSortAmountDown } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoClose } from 'react-icons/io5'
import { FaCirclePlus } from 'react-icons/fa6'

export default function Test() {
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  const [userData, setUserData] = useState()
  const router = useRouter()
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  //登出功能

  //檢查是否獲取資料
  // console.log(LoginUserData)
  //   讀取使用者資料後 定義大頭貼路徑
  let avatarImage
  if (LoginUserData.img) {
    avatarImage = `/user/${LoginUserData.img}`
  } else if (LoginUserData.photo_url) {
    avatarImage = `${LoginUserData.photo_url}`
  } else {
    avatarImage = `/user/avatar_userDefault.jpg`
  }
  // 舊版會警告 因為先渲染但沒路徑 bad
  // const avatarImage = `/user/${LoginUserData.img}`
  // const avatargoogle = `${LoginUserData.photo_url}`
  // const avatarDefault = `/user/avatar_userDefault.jpg`

  // ----------------------會員登入狀態  ----------------------

  // ----------------------會員資料處理  ----------------------
  // 處理生日
  let birthday
  if (LoginUserData.birthday) {
    birthday = LoginUserData.birthday.split('T')[0]
  }
  // console.log(birthday)
  // ----------------------會員資料處理  ----------------------

  // ----------------------手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  // sidebar
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebarToggle = () => {
    setShowSidebar(!showSidebar)
  }
  // ----------------------假資料  ----------------------
  // sidebar假資料
  // const sidebarData = [
  //   '會員資訊',
  //   '我的樂團',
  //   '我的訂單',
  //   '我的文章',
  //   '我的收藏',
  //   '我的優惠券 ',
  //   '我的課程',
  //   '我的訊息',
  // ]

  // 資料排序
  const [dataSort, setDataSort] = useState('latest')
  // ----------------------條件篩選  ----------------------
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
  // filter假資料
  const brandData = [
    { id: 1, name: 'YAMAHA' },
    { id: 2, name: 'Roland' },
    { id: 3, name: 'Fender' },
    { id: 4, name: 'Gibson' },
  ]
  const [brandSelect, setBrandSelect] = useState('all')

  const [priceLow, setPriceLow] = useState('')
  const [priceHigh, setPriceHigh] = useState('')

  // 課程評價
  const scoreState = ['all', '5', '4', '3']
  const [score, setScore] = useState('all')

  // 活動促銷
  const [sales, setSales] = useState(false)

  // 清除表單內容
  const cleanFilter = () => {
    setBrandSelect('all')
    setPriceLow('')
    setPriceHigh('')
    setScore('all')
    setSales(false)
  }

  //-------------引用jam表單設定

  const [fakeUser, setFakeUser] = useState({
    id: 110,
    uid: 'n500ef48Ibat',
    juid: '6q3SoqnuPEXJ',
  })
  const mySwal = withReactContent(Swal)
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

  // ---------------------- 表單填寫 ----------------------
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

  return (
    <>
      <Head>
        <title>修改會員資訊</title>
      </Head>
      <Navbar menuMbToggle={menuMbToggle} />
      {/* 先把HEROSECTION隱藏 */}
      {/* <div
        className="page-shero d-none d-sm-block"
        style={{ paddingTop: '60px' }}
      >
        <Image src={jamHero} className="object-fit-cover w-100" alt="cover" />
      </div> */}
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
                src={avatarImage}
                alt="user photo mb"
                fill
                sizes="(max-width: 150px)"
              ></Image>
            </div>
            <div>{LoginUserData.nickname}</div>
          </div>
          <Link
            className="mm-item"
            href="/user/user-info"
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
          {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events*/}
          <div
            onClick={handleLogout}
            //onclick 要加這個 不然ES會跳沒有給身障人士使用
            role="presentation"
            className="mm-item"
            style={{ color: '#1581cc' }}
          >
            登出
            <ImExit size={20} className="ms-2" />
          </div>
        </div>
        <div className="row">
          {/* sidebar */}
          <div className="sidebar-wrapper d-none d-sm-block col-sm-2">
            <div className="sidebar">
              <div className="sidebar-user-info">
                <div className="sidebar-user-info-imgBox">
                  <Image
                    src={avatarImage}
                    alt="user photo mb"
                    fill
                    priority="default" //不加的話Next 會問是否要加優先級
                    sizes="(max-width: 150px)"
                  ></Image>
                </div>
                <div className="sidebar-user-info-text">
                  <div className="sidebar-user-info-name">
                    {LoginUserData.nickname}
                  </div>
                  <div className="sidebar-user-info-band">樂團名稱七個字</div>
                </div>
                {/* 更換大頭貼的功能暫定併回會員資訊 故不再sidebar顯示 */}
                {/* <div className="sidebar-user-info-Camera-img">
                  <Image src={avatar} alt="user photo mb" fill></Image>
                </div> */}
              </div>
              <ul className="d-flex flex-column">
                {/* {sidebarData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={`#`}>{item}</Link>
                    </li>
                  )
                })} */}

                <li key={1}>
                  <Link href="/user/user-info">會員資訊</Link>
                </li>
                <li key={2}>
                  <Link href="/user/user-jam">我的樂團</Link>
                </li>
                <li key={3}>
                  <Link href="/user/user-order">我的訂單</Link>
                </li>
                <li key={4}>
                  <Link href="/user/user-article">我的文章</Link>
                </li>
                <li key={5}>
                  <Link href="/user/user-favorite">我的收藏</Link>
                </li>
                <li key={6}>
                  <Link href="/user/user-coupon">我的優惠券</Link>
                </li>
                <li key={7}>
                  <Link href="/user/user-lesson">我的課程</Link>
                </li>
                <li key={8}>
                  <Link href="/user/user-notify">我的訊息</Link>
                </li>
              </ul>
            </div>
          </div>

          {/*   ----------------------頁面內容  ---------------------- */}

          {/*   ----------------------頁面內容  ---------------------- */}
          <div className="col-12 col-sm-10 page-control">
            {/* 手機版sidebar */}
            <div
              className={`sidebar-mb d-sm-none ${
                showSidebar ? 'sidebar-mb-show' : ''
              }`}
            >
              <div className="sm-close">
                <IoClose
                  size={32}
                  onClick={() => {
                    setShowSidebar(false)
                  }}
                />
              </div>

              <Link href={`/jam/recruit-list`} className="sm-item active">
                會員資訊
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的樂團
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的訂單
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的文章
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的收藏
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的優惠券
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的課程
              </Link>
              <Link href={`/jam/recruit-list`} className="sm-item">
                我的訊息
              </Link>
            </div>
            {/*  ---------------------- 頂部功能列  ---------------------- */}
            <div className="top-function-container">
              {/*  ---------------------- 麵包屑  ---------------------- */}
              <div className="breadcrumb-wrapper-ns">
                <ul className="d-flex align-items-center p-0 m-0">
                  <IoHome size={20} />
                  <li style={{ marginLeft: '8px' }}>會員中心</li>
                  <FaChevronRight />
                  <li style={{ marginLeft: '10px' }}>會員資訊</li>
                </ul>
              </div>

              <div className="top-function-flex">
                {/*  ---------------------- 搜尋欄  ---------------------- */}
                <div className="search-sidebarBtn">
                  <div
                    className="d-flex d-sm-none align-items-center b-btn b-btn-body"
                    role="presentation"
                    style={{ paddingInline: '16px' }}
                    onClick={sidebarToggle}
                  >
                    選單
                  </div>
                </div>
              </div>
            </div>
            {/* 主內容 */}

            {/* //----------------------參考jam------------------------- */}

            <section className="col-12 col-sm-8" style={{ padding: 0 }}>
              {/* 主內容 */}
              <div className={`${styles.jamLeft}`}>
                <div className="row align-items-center">
                  <div className={`${styles.jamTitle} col-12 col-sm-2`}>
                    發起表單
                  </div>
                  <div
                    className="col-12 col-sm-10 mt-sm-0"
                    style={{ color: '#666666' }}
                  >
                    ※ 點擊&nbsp;
                    <FaCirclePlus
                      size={18}
                      style={{ color: '#18a1ff' }}
                      className="mb-1"
                    />
                    &nbsp;可增加項目
                  </div>
                </div>

                {/* -------------------------- 主旨 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    主旨
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10 d-flex align-items-center`}
                  >
                    <input
                      type="text"
                      className={`${styles.itemInput} form-control`}
                      placeholder="發起動機或目的，上限20字"
                      maxLength={20}
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                    />
                    {titleCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} ms-2 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {titleCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>
                {/* -------------------------- 技術程度 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    技術程度
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <select
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={degree}
                      name="degree"
                      onChange={(e) => {
                        setDegree(e.target.value)
                      }}
                    >
                      <option value="">請選擇</option>
                      <option value="1">新手練功</option>
                      <option value="2">老手同樂</option>
                    </select>
                  </div>
                </div>
                {/* -------------------------- 音樂風格 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    音樂風格
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <div className={`${styles.selectGroup}`}>
                      {genreSelect.map((v, i) => {
                        return (
                          <select
                            key={i}
                            className="form-select"
                            style={{ width: 'auto' }}
                            value={genre[i]}
                            name="genre"
                            onChange={(e) => {
                              let newgenre = [...genre]
                              newgenre[i] = e.target.value
                              setgenre(newgenre)
                            }}
                          >
                            <option value="">請選擇</option>
                            {genreData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        )
                      })}
                      {genreSelect.length < 3 ? (
                        <div className={`${styles.plusBtnWrapper}`}>
                          <FaCirclePlus
                            size={24}
                            className={`${styles.plusBtn}`}
                            onClick={() => {
                              const newArr = [...genreSelect, 1]
                              setgenreSelect(newArr)
                            }}
                          />
                          <span className="mb-1" style={{ color: '#1d1d1d' }}>
                            (剩餘 {3 - genreSelect.length})
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                      {genreCheck ? (
                        ''
                      ) : (
                        <div
                          className={`${styles.warningText} d-none d-sm-block`}
                          style={{ marginTop: '5px' }}
                        >
                          無法選擇重複曲風
                        </div>
                      )}
                    </div>
                    {genreCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} d-block d-sm-none mt-2 p-0`}
                      >
                        無法選擇重複曲風
                      </div>
                    )}
                  </div>
                </div>
                {/* -------------------------- 擔任職位 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    擔任職位
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <select
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={myPlayer}
                      name="myPlayer"
                      onChange={(e) => {
                        setMyPlayer(e.target.value)
                        setFinalMyPlayer(
                          `{"id": ${fakeUser.id}, "play": ${e.target.value}}`
                        )
                      }}
                    >
                      <option value="">請選擇</option>
                      {playerData.map((v) => {
                        return (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                {/* -------------------------- 徵求樂手 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    徵求樂手
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <div className={`${styles.selectGroup}`}>
                      {playersSelect.map((v, i) => {
                        return (
                          <select
                            key={i}
                            className="form-select"
                            style={{ width: 'auto' }}
                            value={players[i]}
                            name="players"
                            onChange={(e) => {
                              let newplayer = [...players]
                              newplayer[i] = e.target.value
                              setplayers(newplayer)
                            }}
                          >
                            <option value="">請選擇</option>
                            {playerData.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              )
                            })}
                          </select>
                        )
                      })}
                      {playersSelect.length < 6 ? (
                        <div className={`${styles.plusBtnWrapper}`}>
                          <FaCirclePlus
                            size={24}
                            className={`${styles.plusBtn}`}
                            onClick={() => {
                              const newArr = [...playersSelect, 1]
                              setPlayersSelect(newArr)
                            }}
                          />
                          <span style={{ color: '#1d1d1d' }}>
                            (剩餘 {6 - playersSelect.length})
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                {/* -------------------------- 地區 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    地區
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <select
                      className="form-select"
                      style={{ width: 'auto' }}
                      value={region}
                      name="region"
                      onChange={(e) => {
                        setRegion(e.target.value)
                      }}
                    >
                      <option value="">請選擇</option>
                      {cityData.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                {/* -------------------------- 其他條件 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    其他條件(選填)
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <input
                      type="text"
                      className={`form-control`}
                      placeholder="事先說好要求，有助於玩團和樂哦～上限30字"
                      maxLength={30}
                      onChange={(e) => {
                        setCondition(e.target.value)
                      }}
                    />
                    {conditionCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} mt-1 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {conditionCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>
                {/* -------------------------- 描述 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    描述
                  </div>
                  <div
                    className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                  >
                    <textarea
                      className={`${styles.textArea} form-control`}
                      placeholder="輸入清楚、吸引人的描述，讓大家瞭解你的成團動機吧！上限150字"
                      name="description"
                      maxLength={150}
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                    />
                    {descriptionCheck ? (
                      ''
                    ) : (
                      <div
                        className={`${styles.warningText} mt-1 d-none d-sm-block`}
                      >
                        偵測到不雅字詞
                      </div>
                    )}
                  </div>
                  {descriptionCheck ? (
                    ''
                  ) : (
                    <div
                      className={`${styles.warningText} d-block d-sm-none p-0`}
                    >
                      偵測到不雅字詞
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-center">
                  <div
                    className="b-btn b-btn-primary"
                    style={{ paddingInline: '38px' }}
                    role="presentation"
                    onClick={() => {
                      sendForm(
                        fakeUser.uid,
                        title,
                        degree,
                        finalgenre,
                        finalMyPlayer,
                        finalPlayers,
                        region,
                        condition,
                        description
                      )
                    }}
                  >
                    提交
                  </div>
                </div>
                {complete === 0 ? (
                  <div
                    className="d-flex justify-content-center"
                    style={{ marginTop: '-8px' }}
                  >
                    <div className={`${styles.warningText}`}>
                      請遵照規則，並填寫所有必填內容
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </section>

            {/* //----------------------參考jam------------------------- */}

            <main className="content">
              <div className="container custom-container">
                <div className="row">
                  <div
                    className="col-sm-10 col-12"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}
                  >
                    <div className="user-content col-12">
                      <div className="user-content-top">
                        <div className="user-title-userInfo">會員資訊</div>

                        <div className="user-btnGroup">
                          ※ 點擊&nbsp;
                          <FaCirclePlus
                            size={18}
                            style={{ color: '#18a1ff' }}
                            className="mb-1"
                          />
                          &nbsp;可增加項目
                          {/* <div className="user-btnGroup-btn1">
                            <div>
                              <Link href="/user/user-homepage">
                                預覽個人首頁
                              </Link>
                            </div>
                          </div>
                          <div className="user-btnGroup-btn2">
                            <div>編輯資訊</div>
                          </div> */}
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">頭像</div>
                        <div className="user-info-item-Content-avatar">
                          <div className="user-info-item-contentText-imgBox">
                            <Image
                              src={avatarImage}
                              alt="user photo mb"
                              fill
                              priority="default" //不加的話Next 會問是否要加優先級
                              sizes="(max-width: 150px)"
                            ></Image>
                          </div>
                          <div>
                            <input
                              type="file"
                              name="myFile2"
                              class="form-control"
                              // accept=".png, .jpg, .jpeg"
                              accept="image/png, image/jpeg"
                            ></input>
                            <div className="user-info-item-contentText">
                              可選擇的圖片格式: .jpg .png
                            </div>

                            {/* //-----------------測試上傳 */}
                            <form
                              action="http://localhost:3005/api/user/upload1"
                              method="post"
                              enctype="multipart/form-data"
                            >
                              <div className="input-group mb-2">
                                <span className="input-group-text">名稱</span>
                                <input
                                  type="text"
                                  name="name"
                                  // value={LoginUserData}
                                  className="form-control"
                                />
                              </div>
                              <div className="input-group mb-2">
                                <input
                                  type="file"
                                  name="myFile"
                                  id={LoginUserData}
                                  accept="image/png, image/jpeg"
                                  className="form-control"
                                />
                              </div>
                              <div className="d-flex">
                                <button className="btn btn-primary ms-auto">
                                  送出
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">真實姓名</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <input
                              type="text"
                              className={`${styles.itemInput} form-control`}
                              placeholder="真實姓名"
                              maxLength={20}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />
                            {/* {LoginUserData.name} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">暱稱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <input
                              type="text"
                              className={`${styles.itemInput} form-control`}
                              placeholder="暱稱 上限14字"
                              maxLength={20}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />
                            {/* {LoginUserData.nickname} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">性別</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <select
                              className="form-select"
                              style={{ width: 'auto' }}
                              value={degree}
                              name="degree"
                              onChange={(e) => {
                                setDegree(e.target.value)
                              }}
                            >
                              <option value="">請選擇</option>
                              <option value="1">新手練功</option>
                              <option value="2">老手同樂</option>
                            </select>
                            {/* {LoginUserData.gender} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">喜歡曲風</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <div
                              className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                            >
                              <div className={`${styles.selectGroup}`}>
                                {genreSelect.map((v, i) => {
                                  return (
                                    <select
                                      key={i}
                                      className="form-select"
                                      style={{ width: 'auto' }}
                                      value={genre[i]}
                                      name="genre"
                                      onChange={(e) => {
                                        let newgenre = [...genre]
                                        newgenre[i] = e.target.value
                                        setgenre(newgenre)
                                      }}
                                    >
                                      <option value="">請選擇</option>
                                      {genreData.map((v) => {
                                        return (
                                          <option key={v.id} value={v.id}>
                                            {v.name}
                                          </option>
                                        )
                                      })}
                                    </select>
                                  )
                                })}
                                {genreSelect.length < 3 ? (
                                  <div className={`${styles.plusBtnWrapper}`}>
                                    <FaCirclePlus
                                      size={24}
                                      className={`${styles.plusBtn}`}
                                      onClick={() => {
                                        const newArr = [...genreSelect, 1]
                                        setgenreSelect(newArr)
                                      }}
                                    />
                                    <span
                                      className="mb-1"
                                      style={{ color: '#1d1d1d' }}
                                    >
                                      (剩餘 {3 - genreSelect.length})
                                    </span>
                                  </div>
                                ) : (
                                  ''
                                )}
                                {genreCheck ? (
                                  ''
                                ) : (
                                  <div
                                    className={`${styles.warningText} d-none d-sm-block`}
                                    style={{ marginTop: '5px' }}
                                  >
                                    無法選擇重複曲風
                                  </div>
                                )}
                              </div>
                              {genreCheck ? (
                                ''
                              ) : (
                                <div
                                  className={`${styles.warningText} d-block d-sm-none mt-2 p-0`}
                                >
                                  無法選擇重複曲風
                                </div>
                              )}
                            </div>

                            {/* {LoginUserData.genre_like} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">演奏樂器</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <div
                              className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                            >
                              <select
                                className="form-select"
                                style={{ width: 'auto' }}
                                value={myPlayer}
                                name="myPlayer"
                                onChange={(e) => {
                                  setMyPlayer(e.target.value)
                                  setFinalMyPlayer(
                                    `{"id": ${fakeUser.id}, "play": ${e.target.value}}`
                                  )
                                }}
                              >
                                <option value="">請選擇</option>
                                {playerData.map((v) => {
                                  return (
                                    <option key={v.id} value={v.id}>
                                      {v.name}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                            {/* {LoginUserData.play_instrument} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">公開資訊</div>
                        <div className="user-info-item-checkBoxGroup ">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyBD"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyBD"
                            >
                              生日
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyPhone"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyPhone"
                            >
                              手機
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="privacyEmail"
                              defaultChecked=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="privacyEmail"
                            >
                              電子信箱
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">生日</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <input
                              type="date"
                              className={`${styles.itemInput} form-control`}
                              placeholder=""
                              maxLength={20}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />

                            {birthday}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">手機</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <input
                              type="date"
                              className={`${styles.itemInput} form-control`}
                              placeholder="電話號碼"
                              maxLength={20}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />
                            {/* {LoginUserData.phone} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">電子信箱</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText">
                            <input
                              type="mail"
                              className={`${styles.itemInput} form-control`}
                              placeholder="請輸入電子信箱"
                              maxLength={20}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />

                            {/* {LoginUserData.email} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item">
                        <div className="user-info-item-titleText">地址</div>
                        <div className="user-info-item-Content">
                          <div className="user-info-item-contentText d-flex">
                            <input
                              type="text"
                              className={`${styles.itemInputPostcode} form-control `}
                              placeholder="郵遞區號"
                              maxLength={3}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />
                            <div className={`${styles.itemInputWrapper} `}>
                              <select
                                className="form-select"
                                style={{ width: 'auto' }}
                                value={region}
                                name="region"
                                onChange={(e) => {
                                  setRegion(e.target.value)
                                }}
                              >
                                <option value="">請選擇</option>
                                {cityData.map((v, i) => {
                                  return (
                                    <option key={i} value={v}>
                                      {v}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>

                            <div className={`${styles.itemInputWrapper}`}>
                              <select
                                className="form-select"
                                style={{ width: 'auto' }}
                                value={region}
                                name="region"
                                onChange={(e) => {
                                  setRegion(e.target.value)
                                }}
                              >
                                <option value="">請選擇</option>
                                {cityData.map((v, i) => {
                                  return (
                                    <option key={i} value={v}>
                                      {v}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>

                            <input
                              type="text"
                              className={`${styles.itemInput} form-control `}
                              placeholder="地址"
                              maxLength={100}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            />

                            {/* {LoginUserData.postcode}&nbsp;
                            {LoginUserData.country}
                            {LoginUserData.township}
                            {LoginUserData.address} */}
                          </div>
                        </div>
                      </div>
                      <div className="user-info-item-info">
                        <div className="user-info-item-info-titleText">
                          自我介紹
                        </div>
                        <div className="user-info-item-info2">
                          <div className="user-info-item-info-contentText form-floating">
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              cols="50"
                            ></textarea>
                            {/* <input
                              type="text"
                              className={`${styles.itemInput} form-control `}
                              placeholder="郵遞區號"
                              maxLength={3}
                              onChange={(e) => {
                                setTitle(e.target.value)
                              }}
                            /> */}

                            {/* {LoginUserData.info} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        /* -------------------user sidebar-------------------- */
        .sidebar-user-info {
          display: flex;
          padding: 0px 12px;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;

          /* position: relative; */

          .sidebar-user-info-imgBox {
            width: 100px;
            height: 100px;
            border-radius: 100px;

            /* react Image 要加上這兩條參數 家在外層容器的css , Image本身要fill */

            position: relative;
            overflow: hidden;
          }
          .sidebar-user-info-text {
            display: flex;
            width: 140px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            color: var(--dark, #1d1d1d);
            text-align: start;

            /* h5 */
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            .sidebar-user-info-band {
              margin-bottom: 20px;
            }
          }

          .sidebar-user-info-Camera-img {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 85px;
            top: 70px;
            fill: var(--light-gray, #cfcfcf);
          }
        }

        /* -------------------user sidebar-------------------- */

        /* --------------- user-contect-acticle--------------- */

        .custom-container {
          padding: 0;
          color: #000;

          & p {
            font-family: 'Noto Sans TC';
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #000;
            text-overflow: ellipsis;
          }
          & h5 {
            font-family: 'Noto Sans TC';
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: var(--primary-deep, #124365);
          }

          .user-content {
            display: flex;
            width: 1070px;
            padding: 20px 10px;
            margin: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            border-radius: 5px;
            background: var(--gray-30, rgba(185, 185, 185, 0.3));
          }

          .user-content {
            max-width: 1076px;
            /* width: 1100px; */
            /* height: 705px; */
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
            background: rgba(185, 185, 185, 0.3);
            border-radius: 5px;
            flex-direction: column;
            justify-content: start;
            align-items: flex-start;
            gap: 5px;
            display: inline-flex;
            font-family: Noto Sans TC;
          }

          .user-content-top {
            align-self: stretch;
            justify-content: space-between;
            align-items: flex-start;
            display: inline-flex;
            word-wrap: break-word;
          }

          .user-title-userInfo {
            color: #0d3652;
            font-size: 28px;
            font-weight: 700;
          }

          .user-btnGroup {
            justify-content: flex-start;
            align-items: flex-start;
            gap: 10px;
            display: flex;
            background-color: var(--back);
            font-size: 18px;
            font-weight: 700;
          }

          .user-btnGroup-btn1 {
            padding: 10px;
            background: #b9b9b9;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }
          .user-btnGroup-btn2 {
            padding: 10px;
            background: #18a1ff;
            border-radius: 5px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            gap: 10px;
            display: flex;
          }

          /* ------------------ */
          .user-info-item {
            align-self: stretch;
            justify-content: space-between;
            align-items: center;
            display: flex;

            .user-info-item-titleText {
              display: flex;
              color: #124365;
              font-size: 16px;
              font-family: Noto Sans TC;
              font-weight: 700;
              word-wrap: break-word;
            }

            .user-info-item-checkBoxGroup {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;
              color: #000;
            }

            .user-info-item-Content {
              display: flex;
              height: 38px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 10px;
              flex: 1 0 0;

              .user-info-item-contentText {
                flex: 1 1 0;
                color: black;
                font-size: 16px;
                font-family: Noto Sans TC;
                font-weight: 400;
                word-wrap: break-word;
              }
            }
            .user-info-item-Content-avatar {
              display: flex;
              height: 138px;
              max-width: 900px;
              padding: 3px 0px;
              align-items: center;
              gap: 30px;
              flex: 1 0 0;

              .user-info-item-contentText-imgBox {
                width: 100px;
                height: 100px;
                border-radius: 100px;
                /* react Image 要加上這兩條參數 家在外層容器的css , Image本身要fill */
                position: relative;
                overflow: hidden;
              }
            }
          }

          .user-info-item-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            align-self: stretch;
          }

          .user-info-item-info-titleText {
            color: var(--primary-deep, #124365);
            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .user-info-item-info2 {
            display: flex;
            max-width: 900px;
            align-items: center;
            gap: 10px;
            flex: 1 0 0;
          }

          .user-info-item-info-contentText {
            flex: 1 0 0;
            color: #000;
            text-align: justify;
            font-family: 'Noto Sans TC';
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          .user-orderList-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            align-self: stretch;
          }
        }

        /*------------- RWD  ----------- */
        @media screen and (max-width: 576px) {
          body {
            padding-inline: 20px;
          }

          .custom-container {
            overflow: hidden;

            .user-content {
              width: 390px;
              padding: 10px;
              overflow: hidden;
              margin-bottom: 20px;

              .user-info-item {
                display: block;
              }

              .user-info-item-info {
                display: block;
              }
            }
          }
          /*------------- RWD  ----------- */
        }
      `}</style>
    </>
  )
}
