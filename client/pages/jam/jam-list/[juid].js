import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import { useAuth } from '@/hooks/user/use-auth'
import { useJam } from '@/hooks/use-jam'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import MemberInfo from '@/components/jam/member-info'
import Apply from '@/components/jam/apply'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Info() {
  const router = useRouter()
  const { setInvalidJam, checkCancel, notifyAccept, notifyReject } = useJam()
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
    name: '',
    formed_time: '',
    genre: [],
    region: '',
    introduce: '',
    cover_img: '',
    works_link: '',
    former: {},
    member: [],
  })
  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
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
  // ----------------------------- 入團申請表單 -----------------------------
  const [complete, setComplete] = useState(2)
  // ---------------------- 描述 ----------------------
  const [message, setMessage] = useState('')
  const [messageCheck, setMessageCheck] = useState(true)

  const checkLogin = (LoginUserData) => {
    if (
      !LoginUserData ||
      LoginUserData.status === 'error' ||
      LoginUserData.length == 0
    ) {
      toast('請先登入', {
        icon: 'ℹ️',
        style: {
          border: '1px solid #666666',
          padding: '16px',
          color: '#1d1d1d',
        },
        duration: 3000,
      })
      return false
    } else {
      return true
    }
  }

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
    setComplete(1)
    return true
  }

  // 送出申請表單
  const sendApply = async (myPlayer, message) => {
    if (!checkComplete()) {
      return false
    }
    let formData = new FormData()
    formData.append('juid', jam.juid)
    formData.append('former_uid', jam.former.uid)
    formData.append('applier_uid', LoginUserData.uid)
    formData.append('applier_play', myPlayer)
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
      notifySuccess()
    } else {
      console.log(result.error)
    }
  }

  // 申請成功後，彈出訊息框
  const notifySuccess = () => {
    mySwal
      .fire({
        position: 'center',
        icon: 'success',
        iconColor: '#1581cc',
        title: '申請成功，請靜候審核結果',
        showConfirmButton: false,
        timer: 3000,
      })
      .then(
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      )
  }

  // 決定審核結果
  const sendResult = async (id, state) => {
    let formData = new FormData()
    formData.append('id', id)
    formData.append('state', state)
    const res = await fetch('http://localhost:3005/api/jam/decideApply', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      if (result.state === 1) {
        notifyAccept()
      } else if (result.state === 2) {
        notifyReject()
      }
    } else if (result.status === 'cancel') {
      checkCancel()
    }
  }

  // 解散樂團
  const sendDisband = async () => {
    // 組合出所有樂團內的成員uid
    let ids = []
    ids.push(jam.former.uid)
    for (let i = 0; i < jam.member.length; i++) {
      ids.push(jam.member[i].uid)
    }
    let formData = new FormData()
    formData.append('ids', JSON.stringify(ids))
    formData.append('juid', jam.juid)
    const res = await fetch('http://localhost:3005/api/jam/disband', {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    })
    const result = await res.json()
    if (result.status === 'success') {
      return true
    } else {
      return false
    }
  }

  // 解散警示&成功訊息
  const warningDisband = () => {
    mySwal
      .fire({
        title: '即將解散樂團',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec3f3f',
        cancelButtonColor: '#666666',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await sendDisband()
          if (res) {
            mySwal.fire({
              title: '樂團已解散，重新導向至招募列表',
              icon: 'success',
              iconColor: '#1581cc',
              showConfirmButton: false,
              timer: 2500,
            })
            setTimeout(() => {
              router.push('/jam/recruit-list')
            }, 2500)
          }
        }
      })
  }

  // 向伺服器要求資料，設定到狀態中用的函式
  const getSingleData = async (juid) => {
    try {
      const res = await fetch(
        // 加入uid是為了檢查該使用者是否有申請此樂團，以及其申請狀態
        `http://localhost:3005/api/jam/singleFormedJam/${juid}`
      )
      // res.json()是解析res的body的json格式資料，得到JS的資料格式
      const data = await res.json()
      if (data.status === 'success') {
        setPlayer(data.playerData)
        setGenre(data.genreData)
        setJam(data.jamData)
        // 若該樂團已成立，導向成團後的資訊頁面
      } else if (data.status === 'formed') {
        router.push(`/jam/jam-list/${juid}`)
      } else if (data.status === 'error') {
        setInvalidJam(false)
        router.push(`/jam/recruit-list`)
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
  }, [router.isReady, LoginUserData.uid])

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
      <Head>
        <title>JAM資訊</title>
      </Head>
      <Toaster
        containerStyle={{
          top: 80,
          zIndex: 101,
        }}
      />
      <Navbar menuMbToggle={menuMbToggle} />
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
                {LoginUserData.id === jam.former.id ? (
                  <div className="d-flex justify-content-center">
                    <Link
                      className="b-btn b-btn-primary"
                      style={{ paddingInline: '38px' }}
                      href="/jam/recruit-list/edit"
                    >
                      修改表單
                    </Link>
                  </div>
                ) : (
                  ''
                )}
              </section>
              {/* -------------------------- 入團申請 -------------------------- */}
            </div>
          </div>

          {/*   ---------------------- 成員名單  ---------------------- */}
          <div className={`${styles.jamRightWrapper} col-12 col-sm-4`}>
            <div className={`${styles.jamRight}`}>
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
                  {jam.member.map((v) => {
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
                  })}
                </div>
              </div>
              {LoginUserData.id === jam.former.id ? (
                <div className="d-flex justify-content-center gap-5 mt-4">
                  <div
                    className="b-btn b-btn-danger px-3"
                    role="presentation"
                    onClick={() => {
                      warningDisband()
                    }}
                  >
                    解散樂團
                  </div>
                  <div className="b-btn b-btn-primary px-3" role="presentation">
                    立即成團
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
