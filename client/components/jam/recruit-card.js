import { useState } from 'react'
import styles from '@/components/jam/recruit-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function RecruitCard() {
  return (
    <>
      <Link href={'#'}>
        <div className={`${styles.recruitCard}`}>
          {/* card-header */}
          <div className={`d-flex justify-content-between`}>
            <div className={`${styles.former}`}>
              <span style={{ color: '#5a5a5a', fontWeight: '500' }}>
                發起人
              </span>
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
          <div style={{ fontSize: '18px' }}>北部上班族想組樂團</div>
          {/* player */}
          <div className="d-flex align-items-center" style={{ gap: '8px' }}>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>
              徵求樂手：
            </span>
            <div className={`${styles.cardBadge} ${styles.player}`}>吉他</div>
            <div className={`${styles.cardBadge} ${styles.player}`}>貝斯</div>
          </div>
          {/* genere */}
          <div className="d-flex align-items-center" style={{ gap: '8px' }}>
            <span style={{ color: '#124365', fontWeight: 'bold' }}>
              音樂風格：
            </span>
            <div className={`${styles.cardBadge} ${styles.genere}`}>搖滾</div>
            <div className={`${styles.cardBadge} ${styles.genere}`}>R&B</div>
            <div className={`${styles.cardBadge} ${styles.genere}`}>
              世界音樂
            </div>
          </div>
          {/* region & deadline */}
          <div className="d-flex justify-content-between">
            <div>
              <span style={{ color: '#124365', fontWeight: 'bold' }}>
                地區：
              </span>
              <span>臺北市</span>
            </div>
            <div>
              <span style={{ color: '#124365', fontWeight: 'bold' }}>
                倒數期限：
              </span>
              <span>30 天</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
