import styles from '@/components/jam/recruit-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'

import genereData from '@/data/genre.json'

export default function JamCard({
  name,
  cover_img,
  genere,
  region,
  formed_time,
}) {
  // genere對應
  const genereName = genere.map((g) => {
    const matchedGenere = genereData.find((gd) => gd.id === g)
    return matchedGenere.name
  })

  // 組合日期
  const formedYear = new Date(formed_time).getFullYear()
  const formedMonth = new Date(formed_time).getMonth()
  const formedDate = new Date(formed_time).getDate()
  const combineDate = `${formedYear}-${formedMonth}-${formedDate}`
  return (
    <>
      <Link href="#" className={`${styles.recruitCard}`}>
        {/* 樂團名稱 */}
        <div style={{ fontSize: '18px', color: '#1d1d1d', fontWeight: '500' }}>
          {name}
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
              成立日期：
            </span>
            <span style={{ color: '#1d1d1d' }}>{combineDate}</span>
          </div>
        </div>
      </Link>
    </>
  )
}
