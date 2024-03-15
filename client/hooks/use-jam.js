import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

export const JamContext = createContext()

export function JamProvider({ children }) {
  const [invalidJam, setInvalidJam] = useState(true)
  const [invalidEdit, setInvalidEdit] = useState(true)

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

  // 用非正當手段進入編輯頁面
  const notifyInvalidEditToast = () => {
    toast.error('請勿進行非法操作', {
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
    setInvalidEdit(true)
  }

  const checkCancel = () => {
    toast('申請者已取消申請，將重整頁面', {
      icon: '❕',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2500,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2500)
  }

  const notifyAccept = () => {
    toast.success('已接受，等待對方確認加入', {
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      iconTheme: {
        primary: '#1581cc',
      },
      duration: 2500,
    })
  }

  const notifyReject = () => {
    toast('已拒絕', {
      icon: '❕',
      style: {
        border: '1px solid #666666',
        padding: '16px',
        color: '#1d1d1d',
      },
      duration: 2500,
    })
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
      duration: 2500,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2500)
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
      duration: 2500,
    })
    setTimeout(() => {
      window.location.reload()
    }, 2500)
  }

  return (
    <JamContext.Provider
      value={{
        invalidJam,
        invalidEdit,
        setInvalidJam,
        setInvalidEdit,
        notifyInvalidToast,
        notifyInvalidEditToast,
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
