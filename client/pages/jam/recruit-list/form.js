import { useEffect, useState } from 'react'
import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
//data
import CityCountyData from '@/data/CityCountyData.json'
import playerData from '@/data/player.json'
import genreData from '@/data/genre.json'
// icons
import { IoHome } from 'react-icons/io5'
import { FaChevronRight } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
import { FaCirclePlus } from 'react-icons/fa6'
// scss
import styles from '@/pages/jam/jam.module.scss'

export default function Form() {
  // ---------------------- 手機版本  ----------------------
  // 主選單
  const [showMenu, setShowMenu] = useState(false)
  const menuMbToggle = () => {
    setShowMenu(!showMenu)
  }
  // ---------------------- 標題
  const [title, setTitle] = useState('')
  // ---------------------- 技術程度
  const [degree, setDegree] = useState('')

  // ---------------------- 曲風
  // 儲存選擇的曲風
  const [genre, setgenre] = useState([])
  // 儲存曲風下拉選單的數量
  const [genreSelect, setgenreSelect] = useState([1])
  // 實際使用的曲風陣列，避免使用者未照順序新增樂手
  const [finalgenre, setFinalgenre] = useState('')
  useEffect(() => {
    const fgArr = genre.filter((v) => v != (null || undefined))
    setFinalgenre(`[${fgArr.toString()}]`)
  }, [genre])

  // ---------------------- 擔任職位
  const [myPlayer, setMyPlayer] = useState('')
  console.log(myPlayer)

  // ---------------------- 徵求樂手
  const [players, setplayers] = useState([])
  const [playersSelect, setPlayersSelect] = useState([1])
  // 實際使用的樂手陣列，避免使用者未照順序新增樂手
  const [finalPlayers, setFinalPlayers] = useState([])
  useEffect(() => {
    const fpArr = players.filter((v) => v != (null || undefined))
    setFinalPlayers(`[${fpArr.toString()}]`)
  }, [players])

  // 篩選城市用的資料
  const cityData = CityCountyData.map((v, i) => {
    return v.CityName
  }).filter((v) => {
    return v !== '釣魚臺' && v !== '南海島'
  })
  const [region, setRegion] = useState('')

  // ---------------------- 其他條件
  const [condition, setCondition] = useState('')
  // ---------------------- 描述
  const [description, setDescription] = useState('')
  return (
    <>
      <Head>
        <title>發起JAM</title>
      </Head>
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
              <li style={{ marginLeft: '10px' }}>發起JAM</li>
            </ul>
          </div>
          <div className="col-12 col-sm-8" style={{ padding: 0 }}>
            {/* 主內容 */}
            <div className={`${styles.jamLeft}`}>
              <div className={`${styles.jamTitle}`}>發起表單</div>
              {/* -------------------------- 標題 -------------------------- */}
              <div className={`${styles.formItem} row`}>
                <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                  標題
                </div>
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
                  <input
                    type="text"
                    className={`${styles.itemInput} form-control`}
                    placeholder="發起動機或目的，限20字"
                    maxLength={20}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />
                </div>
              </div>
              {/* -------------------------- 技術程度 -------------------------- */}
              <div className={`${styles.formItem} row`}>
                <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                  技術程度
                </div>
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
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
                      <div className={`${styles.plusBtn}`}>
                        <FaCirclePlus
                          size={24}
                          style={{ color: '#124365', cursor: 'pointer' }}
                          onClick={() => {
                            const newArr = [...genreSelect, 1]
                            setgenreSelect(newArr)
                          }}
                        />
                        <span style={{ color: '#1d1d1d' }}>
                          (剩餘 {3 - genreSelect.length})
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              {/* -------------------------- 擔任職位 -------------------------- */}
              <div className={`${styles.formItem} row`}>
                <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                  擔任職位
                </div>
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
                  <select
                    className="form-select"
                    style={{ width: 'auto' }}
                    value={myPlayer}
                    name="myPlayer"
                    onChange={(e) => {
                      setMyPlayer('{"id": 1, "play": ' + e.target.value + '}')
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
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
                      <div className={`${styles.plusBtn}`}>
                        <FaCirclePlus
                          size={24}
                          style={{ color: '#124365', cursor: 'pointer' }}
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
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
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
                  <input
                    type="text"
                    className={`form-control`}
                    placeholder="事先說好要求，有助於玩團和樂哦~ 限30字"
                    maxLength={30}
                    onChange={(e) => {
                      setCondition(e.target.value)
                    }}
                  />
                </div>
              </div>
              {/* -------------------------- 描述 -------------------------- */}
              <div className={`${styles.formItem} row`}>
                <div className={`${styles.itemTitle} col-12 col-sm-2`}>
                  描述
                </div>
                <div className={`${styles.itemInputWrapper} col-12 col-sm-10`}>
                  <textarea
                    className={`${styles.textArea} form-control`}
                    placeholder="輸入清楚、吸引人的描述，讓大家瞭解你的成團動機吧！限150字"
                    maxLength={150}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
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

          {/*   ---------------------- 發起須知  ---------------------- */}
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
                  無法成團，視為發起失敗，將解散 JAM。
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
