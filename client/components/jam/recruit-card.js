import { useState } from 'react'
import styles from '@/components/jam/recruit-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import playerData from '@/data/player.json'
import genereData from '@/data/genere.json'

export default function RecruitCard({
  former,
  title,
  degree,
  genere,
  player,
  region,
  created_time,
}) {
  // 讓player代碼對應樂器種類
  const playerName = player.map((p) => {
    const matchedPlayer = playerData.find((pd) => pd.id === p) // 物件
    return matchedPlayer.name
  })
  // genere對應
  const genereName = genere.map((g) => {
    const matchedGenere = genereData.find((gd) => gd.id === g)
    return matchedGenere.name
  })

  // 組合日期
  const createdYear = new Date(created_time).getFullYear()
  const createdMonth = new Date(created_time).getMonth()
  const createdDate = new Date(created_time).getDate()
  const combineDate = `${createdYear}-${createdMonth}-${createdDate}`
  // 計算剩餘天數
  const createdTime = new Date(created_time).getTime()
  const currentTime = new Date().getTime()
  // 取得毫秒後，轉換成天數
  const countDown = Math.ceil((createdTime - currentTime) / (1000 * 3600 * 24))
  // console.log(currentTime)
  return (
    <>
      <Link href="#" className={`${styles.recruitCard}`}>
        {/* card-header */}
        <div
          className="d-flex justify-content-between align-items-center flex-wrap"
          style={{ gap: '6px' }}
        >
          <div className={`${styles.former}`}>
            {/* <span style={{ color: '#5a5a5a', fontWeight: '500' }}>發起人</span> */}
            {/* 發起人頭像 */}
            <div className={`${styles.userPhotoWrapper}`}>
              <Image
                src="/jam/amazingshow.jpg"
                alt="user-photo"
                fill={true}
                className={`${styles.userPhoto}`}
              />
            </div>
            <span style={{ color: '#124365', fontWeight: '500' }}>
              {former.id}
            </span>
            <span className="ms-2" style={{ color: '#1d1d1d' }}>
              {combineDate}
            </span>
          </div>
          {/* 程度 */}
          <div
            className={`${styles.cardBadge} ${styles.degree} d-flex align-items-center`}
          >
            {degree == 1 ? '新手練功' : '老手同樂'}
          </div>
        </div>
        {/* card-title */}
        <div style={{ fontSize: '18px', color: '#1d1d1d', fontWeight: '500' }}>
          {title}
        </div>
        {/* player */}
        <div className="d-flex align-items-start" style={{ gap: '8px' }}>
          <span style={{ color: '#124365', fontWeight: 'bold' }}>
            徵求樂手：
          </span>
          <div
            className="d-flex flex-wrap"
            style={{ gap: '8px', flex: '1 0 0' }}
          >
            {playerName.map((v, i) => {
              return (
                <div key={i} className={`${styles.cardBadge} ${styles.player}`}>
                  {v}
                </div>
              )
            })}
          </div>
        </div>
        {/* genere */}
        <div className="d-flex align-items-start" style={{ gap: '8px' }}>
          <span style={{ color: '#124365', fontWeight: 'bold' }}>
            音樂風格：
          </span>
          <div
            className="d-flex flex-wrap"
            style={{ gap: '8px', flex: '1 0 0' }}
          >
            {genereName.map((v, i) => {
              return (
                <div key={i} className={`${styles.cardBadge} ${styles.genere}`}>
                  {v}
                </div>
              )
            })}
          </div>
        </div>
        {/* region & deadline */}
        <div className="d-flex justify-content-between">
          <div>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>地區：</span>
            <span style={{ color: '#1d1d1d' }}>{region}</span>
          </div>
          <div>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>
              倒數期限：
            </span>
            <span
              style={
                countDown <= 3 ? { color: '#ec3f3f' } : { color: '#1d1d1d' }
              }
            >
              {countDown == 0 ? '今天' : countDown + ' 天'}
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}
