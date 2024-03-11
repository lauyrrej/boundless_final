import styles from '@/pages/jam/jam.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

export default function Apply({
  id = 0,
  applier = {},
  message = '',
  play = '',
  created_time = '',
  state,
  sendResult,
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-sm-start flex-sm-row flex-column px-1">
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: '10px' }}
        >
          <div className={`${styles.cardBadge} ${styles.player}`}>{play}</div>
          <div className={`${styles.userPhotoWrapper}`}>
            {applier.img ? (
              <Image
                src={`/user/${applier.img}`}
                alt={`${applier.name}'s photo`}
                width={32}
                height={32}
                className={`${styles.userPhoto}`}
              />
            ) : (
              <div className={`${styles.userPhotoDefault}`}>
                <FaUser size={24} className={`${styles.userDefaultIcon}`} />
              </div>
            )}
          </div>
          <Link href={`../../user`} className={`${styles.memberName}`}>
            {applier.nickname ? applier.nickname : applier.name}
          </Link>
        </div>

        <div
          data-bs-toggle="collapse"
          href={`#${id}`}
          aria-expanded="false"
          aria-controls="collapseExample"
          className="d-flex justify-content-end mt-1 nt-sm-0"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: '#1581cc',
          }}
        >
          <div>查看訊息</div>
        </div>
      </div>
      <div class="collapse" id={id}>
        <div class="card card-body">
          <div className="fw-medium">{created_time}</div>
          {message}
          <div className="d-flex justify-content-end gap-2">
            <div
              className="b-btn b-btn-body px-3"
              role="presentation"
              onClick={() => {
                sendResult(id, 2)
              }}
            >
              拒絕
            </div>
            <div
              className="b-btn b-btn-primary px-3"
              role="presentation"
              onClick={() => {
                sendResult(id, 1)
              }}
            >
              接受
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
