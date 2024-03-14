import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

export const JamContext = createContext()

export function JamProvider({ children }) {
  const [invalidJam, setInvalidJam] = useState(true)

  const notifyInvalidToast = () => {
    toast.error('指定樂團不存在或已解散', {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#ec3f3f',
      },
      duration: 3500,
    })
    setInvalidJam(true)
  }

  const checkCancel = () => {
    toast('申請者已取消申請', {
      icon: '❕',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2200,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2200)
  }

  const notifyAccept = () => {
    toast.success('已接受，等待對方確認', {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#1581cc',
      },
      duration: 2200,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2200)
  }

  const notifyReject = () => {
    toast('已拒絕', {
      icon: '❕',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2200,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2200)
  }

  const cancelSuccess = () => {
    toast.success('已取消申請', {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#1581cc',
      },
      duration: 2000,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const deleteSuccess = () => {
    toast.success('資料已刪除', {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#1581cc',
      },
      duration: 2000,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return (
    <JamContext.Provider
      value={{
        invalidJam,
        setInvalidJam,
        notifyInvalidToast,
        checkCancel,
        notifyAccept,
        notifyReject,
        cancelSuccess,
        deleteSuccess,
      }}
    >
      {children}
    </JamContext.Provider>
  )
}

export const useJam = () => useContext(JamContext)
