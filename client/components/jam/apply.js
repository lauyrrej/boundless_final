import styles from '@/pages/jam/jam.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

export default function Apply() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-sm-start flex-sm-row flex-column px-1">
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ gap: '10px' }}
        >
          <div className={`${styles.cardBadge} ${styles.player}`}>人聲</div>
          <div className={`${styles.userPhotoWrapper}`}>
            <div className={`${styles.userPhotoDefault}`}>
              <FaUser size={24} className={`${styles.userDefaultIcon}`} />
            </div>
          </div>
          <Link href={`../../user`} className={`${styles.memberName}`}>
            測試名稱測試測試名稱測試測試名稱測試
          </Link>
        </div>

        <div
          data-bs-toggle="collapse"
          href="#collapseExample"
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
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <div className="fw-medium">2024-3-22</div>
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
          <div className="d-flex justify-content-end gap-2">
            <div className="b-btn b-btn-body px-3">拒絕</div>
            <div className="b-btn b-btn-primary px-3">接受</div>
          </div>
        </div>
      </div>
    </>
  )
}
