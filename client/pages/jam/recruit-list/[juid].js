import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useAuth } from '@/hooks/user/use-auth'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import MemberInfo from '@/components/jam/member-info'
import Apply from '@/components/jam/apply'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Info() {
  const router = useRouter()
  // ----------------------會員登入狀態 & 會員資料獲取  ----------------------
  //從hook 獲得使用者登入的資訊  儲存在變數LoginUserData裡面
  const { LoginUserData, handleLoginStatus, getLoginUserData, handleLogout } =
    useAuth()
  // console.log(LoginUserData)
  //檢查token
  useEffect(() => {
    handleLoginStatus()
    //獲得資料
    getLoginUserData()
  }, [])
  //登出功能
  const mySwal = withReactContent(Swal)

  const [genre, setGenre] = useState([])
  const [player, setPlayer] = useState([])
  const [jam, setJam] = useState({
    id: 0,
    juid: '',
    title: '',
    degree: 0,
    created_time: '',
    genre: [],
    player: [],
    region: '',
    condition: '',
    description: '',
    former: {},
    member: [],
  })

  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  // ----------------------------- 讓player代碼對應樂器種類 -----------------------------
  const playerName = jam.player.map((p) => {
    const matchedPlayer = player.find((pd) => pd.id === p) // 物件
    return matchedPlayer.name
  })
  // 累加重複的樂器種類 吉他變成吉他*2
  const countPlayer = playerName.reduce((accumulator, count) => {
    if (!accumulator[count]) {
      accumulator[count] = 1
    } else {
      accumulator[count]++
    }
    return accumulator
  }, {})
  //   console.log(countPlayer)
  const playerResult = Object.entries(countPlayer).map(([player, count]) => {
    return count > 1 ? `${player}*${count}` : player
  })
  //   console.log(playerResult)

  // ----------------------------- 預計人數 -----------------------------
  const nowNumber = jam.member.length + 1
  const totalNumber = jam.member.length + jam.player.length + 1
  // ----------------------------- genre對應 -----------------------------
  const genreName = jam.genre.map((g) => {
    const matchedgenre = genre.find((gd) => gd.id === g)
    return matchedgenre.name
  })

  // ----------------------------- 創立時間資料中，單獨取出日期 -----------------------------
  // 調出的時間是ISO格式，顯示時需要轉換成本地時區
  const createdDate = new Date(jam.created_time)
    .toLocaleString()
    .split(' ')[0]
    .replace(/\//g, '-')
  // ----------------------------- 計算倒數時間 -----------------------------
  const [countDown, setCountDown] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  })

  function calcTimeLeft() {
    let countDownObj = {}
    const now = Date.now()
    // 創立日期 + 30天 - 目前時間 = 剩餘時間
    const createdTime = new Date(jam.created_time).getTime()
    const interval = createdTime + 30 * 24 * 60 * 60 * 1000 - now
    const cdDay = Math.floor(interval / (1000 * 60 * 60 * 24))
    const cdHour = Math.floor(
      (interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const cdMinute = Math.floor((interval % (1000 * 60 * 60)) / (1000 * 60))
    const cdSecond = Math.floor((interval % (1000 * 60)) / 1000)
    countDownObj = {
      day: cdDay,
      hour: cdHour,
      minute: cdMinute,
      second: cdSecond,
    }
    return countDownObj
  }

  // ----------------------------- 剩餘時間是否小於5天 -----------------------------
  const timeWarningState =
    (Date.now() - new Date(jam.created_time).getTime()) /
      (1000 * 60 * 60 * 24) >=
    25
      ? true
      : false

  // ----------------------------- 入團申請表單 -----------------------------
  const [complete, setComplete] = useState(2)
  // ---------------------- 擔任職位 ----------------------
  // 控制表單狀態
  const [myPlayer, setMyPlayer] = useState('')
  // 表單實際送出的內容
  const [finalMyPlayer, setFinalMyPlayer] = useState('')
  // ---------------------- 描述 ----------------------
  const [message, setMessage] = useState('')
  const [messageCheck, setMessageCheck] = useState(true)

  // 檢查不雅字詞
  const checkBadWords = debounce(() => {
    const badWords = /幹|屎|尿|屁|糞|靠北|靠腰|雞掰|王八|你媽|妳媽|淫/g
    setMessageCheck(message.search(badWords) < 0 ? true : false)
  }, 250)

  // 檢查表單是否填妥
  const checkComplete = () => {
    if (messageCheck === false || message === '') {
      setComplete(0)
      return false
    }
    if (finalMyPlayer === '') {
      setComplete(0)
      return false
    }
    setComplete(1)
    return true
  }
  // 送出表單
  const sendForm = async (finalMyPlayer, message) => {
    if (!checkComplete()) {
      return false
    }
    let formData = new FormData()
    formData.append('juid', jam.juid)
    formData.append('former_uid', jam.former.uid)
    formData.append('applier', finalMyPlayer)
    formData.append('message', message)
    // 確認formData內容
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`)
    // }
    const res = await fetch('http://localhost:3005/api/jam/apply', {
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
  // 發起成功後，彈出訊息框
  const notifySuccess = () => {
    mySwal.fire({
      position: 'center',
      icon: 'success',
      iconColor: '#1581cc',
      title: '申請成功，請靜候審核結果',
      showConfirmButton: false,
      timer: 3000,
    })
  }

  // 向伺服器要求資料，設定到狀態中用的函式
  const getSingleData = async (juid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/jam/singleJam/${juid}`)
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()
      if (data) {
        setPlayer(data.playerData)
        setGenre(data.genreData)
        setJam(data.jamData)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // ----------------------------- useEffect -----------------------------
  // 初次渲染後，向伺服器要求資料，設定到狀態中
  useEffect(() => {
    if (router.isReady) {
      const { juid } = router.query
      getSingleData(juid)
    }
  }, [router.isReady])

  // 期限倒數
  useEffect(() => {
    setCountDown(calcTimeLeft())
    // 每秒更新一次倒數計時
    const timer = setInterval(() => {
      setCountDown(calcTimeLeft())
    }, 1000)

    // 清除計時器
    return () => clearInterval(timer)
  }, [jam.created_time])

  // 申請表單填寫
  useEffect(() => {
    // 跳出未填寫完畢警告後再次輸入，消除警告
    setComplete(2)
    // 檢查不雅字詞
    checkBadWords.cancel() // 取消上一次的延遲
    checkBadWords()
  }, [myPlayer, message])

  return (
    <>
      <Navbar menuMbToggle={menuMbToggle} />
      <Head>
        <title>JAM資訊</title>
      </Head>
      <div
        className="container position-relative"
        style={{ minHeight: '95svh' }}
      >
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
        <div className={`${styles.row} row`}>
          {/* 麵包屑 */}
          <div className="breadcrumb-wrapper-ns">
            <ul className="d-flex align-items-center p-0 m-0">
              <IoHome size={20} />
              <li style={{ marginLeft: '8px' }}>Let&apos;s JAM!</li>
              <FaChevronRight />
              <Link href="/jam/recruit-list">
                <li style={{ marginLeft: '10px' }}>團員募集</li>
              </Link>

              <FaChevronRight />
              <li style={{ marginLeft: '10px' }}>JAM資訊</li>
            </ul>
          </div>
          {/*   ---------------------- 主要內容  ---------------------- */}
          <div className={`${styles.jamMain} col-12 col-sm-8`}>
            <div className={`${styles.jamLeft}`}>
              {/*   ---------------------- 樂團資訊  ---------------------- */}
              <section className={`${styles.jamLeftSection}`}>
                <div
                  className={`${styles.jamTitle} d-flex justify-content-between align-items-center`}
                >
                  <div>JAM資訊</div>
                  <div className={`${styles.cardBadge} ${styles.degree}`}>
                    {jam.degree == '1' ? '新手練功' : '老手同樂'}
                  </div>
                </div>
                {/* -------------------------- 主旨 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    主旨
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.title}
                  </div>
                </div>
                {/* -------------------------- 發起日期 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    發起日期
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {createdDate}
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
                    <div
                      className="d-flex flex-wrap"
                      style={{ gap: '8px', flex: '1 0 0' }}
                    >
                      {genreName.map((v, i) => {
                        return (
                          <div
                            key={i}
                            className={`${styles.cardBadge} ${styles.genere}`}
                          >
                            {v}
                          </div>
                        )
                      })}
                    </div>
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
                    <div
                      className="d-flex flex-wrap"
                      style={{ gap: '8px', flex: '1 0 0' }}
                    >
                      {playerResult.map((v, i) => {
                        return (
                          <div
                            key={i}
                            className={`${styles.cardBadge} ${styles.player}`}
                          >
                            {v}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                {/* -------------------------- 預計人數 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    預計人數
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    <span style={{ color: '#1581cc' }}>{nowNumber}</span> /{' '}
                    {totalNumber} 人
                  </div>
                </div>
                {/* -------------------------- 地區 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    地區
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.region}
                  </div>
                </div>
                {/* -------------------------- 其他條件 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    其他條件
                  </div>
                  <div className={`${styles.infoText} col-12 col-sm-10`}>
                    {jam.band_condition == '' ? '無' : jam.band_condition}
                  </div>
                </div>
                {/* -------------------------- 描述 -------------------------- */}
                <div className={`${styles.formItem} row`}>
                  <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                    描述
                  </div>
                  <div
                    className={`${styles.infoText} col-12 col-sm-10`}
                    style={{ textAlign: 'justify' }}
                  >
                    {jam.description}
                  </div>
                </div>
              </section>
              {/* -------------------------- 入團申請 -------------------------- */}
              {LoginUserData.my_jam ? (
                <div>
                  {LoginUserData.my_jam === jam.juid ? (
                    <>
                      {LoginUserData.id === jam.former.id ? (
                        <>
                          {/* 發起人進入所屬樂團頁面 */}
                          <hr style={{ margin: '6px' }} />
                          <section className={`${styles.jamLeftSection} mt-2`}>
                            <div className={`${styles.jamTitle}`}>申請一覽</div>
                            <Apply />
                          </section>
                        </>
                      ) : (
                        <>
                          <hr style={{ margin: '6px' }} />
                          <div className="d-flex justify-content-center">
                            <div
                              className="b-btn b-btn-danger mt-1"
                              style={{ paddingInline: '38px' }}
                              role="presentation"
                              onClick={() => {
                                sendForm(finalMyPlayer, message)
                              }}
                            >
                              退出
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <>
                  {/* 無所屬樂團，顯示申請表單 */}
                  <hr style={{ margin: '6px' }} />
                  <section className={`${styles.jamLeftSection}`}>
                    <div className={`${styles.jamTitle}`}>
                      入團申請
                      <div
                        className={`${styles.noticeText}`}
                        style={{ color: '#666666' }}
                      >
                        ※ 可同時申請多個 JAM，但最終只能擇一加入。
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
                              '{"id": 1, "play": ' + e.target.value + '}'
                            )
                          }}
                        >
                          <option value="">請選擇</option>
                          {player.map((v) => {
                            return (
                              <option key={v.id} value={v.id}>
                                {v.name}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    {/* -------------------------- 想說的話 -------------------------- */}
                    <div className={`${styles.formItem} row`}>
                      <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                        想說的話
                      </div>
                      <div
                        className={`${styles.itemInputWrapper} col-12 col-sm-10`}
                      >
                        <textarea
                          className={`${styles.textArea} form-control`}
                          placeholder="建議可以提到自己喜歡的音樂、入團動機等，上限150字"
                          name="message"
                          maxLength={150}
                          onChange={(e) => {
                            setMessage(e.target.value)
                          }}
                        />
                        {messageCheck ? (
                          ''
                        ) : (
                          <div
                            className={`${styles.warningText} mt-1 d-none d-sm-block`}
                          >
                            偵測到不雅字詞
                          </div>
                        )}
                      </div>
                      {messageCheck ? (
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
                          sendForm(finalMyPlayer, message)
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
                  </section>
                </>
              )}
            </div>
          </div>

          {/*   ---------------------- 成員名單  ---------------------- */}
          <div className={`${styles.jamRightWrapper} col-12 col-sm-4`}>
            <div className={`${styles.jamRight}`}>
              <div className={`${styles.jamTitle}`}>期限倒數</div>
              <div
                style={{
                  color: timeWarningState ? '#ec3f3f' : '#1d1d1d',
                  fontSize: '20px',
                }}
              >
                {`${countDown.day} 天 ${countDown.hour} 小時 ${countDown.minute} 分 ${countDown.second} 秒`}
              </div>
              <div
                className={`${styles.jamTitle}`}
                style={{ marginBlock: '10px' }}
              >
                成員名單
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className={`${styles.itemTitle} me-3`}>發起人</div>
                <MemberInfo
                  uid={jam.former.uid}
                  name={jam.former.name}
                  nickname={jam.former.nickname}
                  img={jam.former.img}
                  play={jam.former.play}
                />
              </div>
              <div className="d-flex">
                <div className={`${styles.itemTitle} me-3`}>參加者</div>
                <div className="d-flex flex-column gap-2">
                  {jam.member[0] ? (
                    jam.member.map((v) => {
                      return (
                        <MemberInfo
                          key={v.uid}
                          uid={v.uid}
                          name={v.name}
                          nickname={v.nickname}
                          img={v.img}
                          play={v.play}
                        />
                      )
                    })
                  ) : (
                    <span className="fw-medium">尚無人參加</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
