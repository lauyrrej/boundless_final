import { useState } from 'react'
import styles from '@/components/jam/recruit-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function RecruitCard() {
  const [discount, setDiscount] = useState('1')
  return (
    <>
      <Link href="#" className={`${styles.recruitCard}`}>
        {/* card-header */}
        <div className={`d-flex justify-content-between align-items-center`}>
          <div className={`${styles.former}`}>
            <span style={{ color: '#5a5a5a', fontWeight: '500' }}>發起人</span>
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
              柏倉隆史
            </span>
            <span className="ms-2" style={{ color: '#124365' }}>
              2024-02-23
            </span>
          </div>
          {/* 程度 */}
          <div
            className={`${styles.cardBadge} ${styles.degree} d-flex align-items-center`}
          >
            老手同樂
          </div>
        </div>
        {/* card-title */}
        <div style={{ fontSize: '18px', color: '#1d1d1d', fontWeight: '500' }}>
          北部上班族想組樂團
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
            <div className={`${styles.cardBadge} ${styles.player}`}>吉他</div>
            <div className={`${styles.cardBadge} ${styles.player}`}>貝斯</div>
            <div className={`${styles.cardBadge} ${styles.player}`}>貝斯</div>
            <div className={`${styles.cardBadge} ${styles.player}`}>貝斯</div>
            <div className={`${styles.cardBadge} ${styles.player}`}>貝斯</div>
          </div>
        </div>
        {/* genere */}
        <div className="d-flex align-items-center" style={{ gap: '8px' }}>
          <span style={{ color: '#124365', fontWeight: 'bold' }}>
            音樂風格：
          </span>
          <div className={`${styles.cardBadge} ${styles.genere}`}>搖滾</div>
          <div className={`${styles.cardBadge} ${styles.genere}`}>環境音樂</div>
          <div className={`${styles.cardBadge} ${styles.genere}`}>世界音樂</div>
        </div>
        {/* region & deadline */}
        <div className="d-flex justify-content-between">
          <div>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>地區：</span>
            <span style={{ color: '#1d1d1d' }}>臺北市</span>
          </div>
          <div>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>
              倒數期限：
            </span>
            <span
              style={
                discount === '2' ? { color: '#1d1d1d' } : { color: '#ec3f3f' }
              }
            >
              30 天
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}
