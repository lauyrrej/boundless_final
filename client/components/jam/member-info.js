import styles from '@/pages/jam/jam.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function MemberInfo({ uid, name, nickname, img, play }) {
  return (
    <div
      className="d-flex align-items-center flex-wrap"
      style={{ gap: '10px' }}
    >
      <div className={`${styles.cardBadge} ${styles.player}`}>{play}</div>
      <div className={`${styles.userPhotoWrapper}`}>
        <Image
          src={`/user/${img}`}
          alt={`${name}'s photo`}
          width={32}
          height={32}
          className={`${styles.userPhoto}`}
        />
      </div>
      <Link href={`../../user/${uid}`} className={`${styles.memberName}`}>
        {nickname ? nickname : name}
      </Link>
    </div>
  )
}
