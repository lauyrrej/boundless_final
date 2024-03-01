import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
//data
import playerData from '@/data/player.json'
import genereData from '@/data/genere.json'
import jamData from '@/data/jam/jam.json'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Info() {
  // 執行(呼叫)useRouter，把回傳的路由器儲存在變數router
  // router.query中會包含pid屬性，藉此獲得動態路由的值
  // router.isReady(布林值)，true代表本元件已完成水合作用(hydration)，可以取得router.query的值
  const router = useRouter()

  const [jam, setJam] = useState({
    id: 0,
    title: '',
    degree: 0,
    created_time: '',
    genere: [],
    player: [],
    region: '',
    condition: '',
    description: '',
    former: {},
    member: {},
  })

  // 讓player代碼對應樂器種類
  const playerName = jam.player.map((p) => {
    const matchedPlayer = playerData.find((pd) => pd.id === p) // 物件
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

  // 預計人數
  const nowNumber = jam.member.length + 1
  const totalNumber = jam.member.length + jam.player.length + 1
  // genere對應
  const genereName = jam.genere.map((g) => {
    const matchedGenere = genereData.find((gd) => gd.id === g)
    return matchedGenere.name
  })

  const createdDate = jam.created_time.split(' ')[0]

  // 向伺服器要求資料，設定到狀態中用的函式
  const getJam = (jid) => {
    const data = jamData.find((v) => {
      return v.id == jid
    })
    // console.log(data)
    setJam(data)

    // try {
    //   const res = await fetch(
    //     `https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/${pid}`
    //   )

    //   // res.json()是解析res的body的json格式資料，得到JS的資料格式
    //   const data = await res.json()

    //   console.log(data)

    //   // 設定到state中，觸發重新渲染(re-render)，會進入到update階段
    //   // 進入狀態前檢查資料類型為陣列，以避免錯誤
    //   if (data.name) {
    //     setJam(data)
    //   }
    // } catch (e) {
    //   console.error(e)
    // }
  }

  // 初次渲染後，向伺服器要求資料，設定到狀態中
  useEffect(() => {
    console.log(router.query)
    // 如果isReady是true，確保能得到query的值
    if (router.isReady) {
      const { jid } = router.query
      console.log(jid)
      getJam(jid)
    }
  }, [router.isReady])
  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
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
              <li style={{ marginLeft: '10px' }}>發起 JAM</li>
            </ul>
          </div>
          <div className="col-12 col-sm-8" style={{ padding: 0 }}>
            {/* 主內容 */}
            <div className={`${styles.jamLeft}`}>
              <div
                className={`${styles.jamTitle} d-flex justify-content-between align-items-center`}
              >
                <div>JAM 資訊</div>
                <div className={`${styles.cardBadge} ${styles.degree}`}>
                  {jam.degree == '1' ? '新手練功' : '老手同樂'}
                </div>
              </div>
              {/* -------------------------- 標題 -------------------------- */}
              <div className={`${styles.formItem} row`}>
                <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                  標題
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
                  <div
                    className="d-flex flex-wrap"
                    style={{ gap: '8px', flex: '1 0 0' }}
                  >
                    {genereName.map((v, i) => {
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
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
                  {jam.condition == '' ? '無' : jam.condition}
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
              <div className="d-flex justify-content-center">
                <div
                  className="b-btn b-btn-primary"
                  style={{ paddingInline: '38px' }}
                >
                  提交
                </div>
              </div>
            </div>
          </div>

          {/*   ---------------------- 成員名單  ---------------------- */}
          <div className={`${styles.jamRightWrapper} col-12 col-sm-4`}>
            <div className={`${styles.jamRight}`}>
              <div className={`${styles.jamTitle}`}>發起須知</div>
              <ol className={`${styles.rules}`}>
                <li>社群互動，請注意禮節。</li>
                <li>
                  發起的 JAM{' '}
                  <span className={`${styles.point}`}>以一個為限</span>
                  ，且發起期間<span className={`${styles.point}`}>不得</span>
                  申請他人的 JAM。
                </li>
                <li>
                  為避免頻繁改變樂團方向，造成和參與者間的協調糾紛，發起後
                  <span className={`${styles.point}`}>
                    僅能修改標題、其他條件及描述內容
                  </span>
                  ，請送出前再三確認。
                </li>
                <li>
                  發起後，若 <span className={`${styles.point}`}>30 天內</span>
                  無法成團，視為發起失敗，將解散JAM。
                </li>
                <li>發起人得視招募情況解散或以當下成員成團。</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
