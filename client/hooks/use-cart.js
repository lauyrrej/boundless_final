import { createContext, useContext, useState } from 'react'
import CartData from '@/data/cart/cart.json'
import CouponData from '@/data/cart/coupons.json'

export const CartContext = createContext()

export function CartProvider({ children }) {
  //加入到購物車的項目
  let [items, setItems] = useState(CartData)

  const addItem = (item) => {
    //擴充item的屬性多一個qty
    const newItem = { ...item, qty: 1 }
    const newItems = [...items, newItem]

    setItems(newItems)
  }

  //在購物車中，移除某商品的id
  const remove = (items, id) => {
    const newItems = items.filter((v, i) => {
      return v.id !== id
    })

    setItems(newItems)
  }

  //遞增某商品id數量
  const increment = (items, id) => {
    const newItems = items.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })

    setItems(newItems)
  }

  //遞減某商品id數量
  const decrement = (items, id) => {
    const newItems = items.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      else return v
    })

    setItems(newItems)
  }

  //lessondata
  const lessonData = items.filter((v, i) => {
    return v.type === 2
  })

  const lessonCoupons = CouponData.filter((v, i) => {
    return v.kind === 2
  })

  //instrumentdata
  const instrumentData = items.filter((v, i) => {
    return v.type === 1
  })

  const instrumentCoupons = CouponData.filter((v, i) => {
    return v.kind === 1
  })

  //計算個數
  const calcTotalItems = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total += items[i].qty
    }
    return total
  }

  const calcLessonItems = () => {
    let total = lessonData.length
    return total
  }

  const calcInstrumentItems = () => {
    let total = 0

    for (let i = 0; i < instrumentData.length; i++) {
      total += instrumentData[i].qty
    }
    return total
  }

  //計算總價格

  const calcLessonPrice = () => {
    let total = 0

    for (let i = 0; i < lessonData.length; i++) {
      total += lessonData[i].price
    }
    return total
  }

  const calcInstrumentPrice = () => {
    let total = 0

    for (let i = 0; i < instrumentData.length; i++) {
      total += instrumentData[i].qty * instrumentData[i].price
    }
    return total
  }

  const calcTotalPrice = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = calcLessonPrice() + calcInstrumentPrice()
    }
    return total
  }

  //計算折價券

  const [lessonDiscount, setLessonDiscount] = useState(0)

  const handleLessonSelector = (e) => {
    setLessonDiscount(e)
  }

  const [instrumentDiscount, setinstrumentDiscount] = useState(0)

  const handleInstrumentSelector = (e) => {
    setinstrumentDiscount(e)
  }


  return (
    <CartContext.Provider
      value={{
        items,
        instrumentData,
        instrumentCoupons,
        instrumentDiscount,
        lessonData,
        lessonCoupons,
        lessonDiscount,
        handleLessonSelector,
        handleInstrumentSelector,
        addItem,
        increment,
        decrement,
        remove,
        calcInstrumentItems,
        calcInstrumentPrice,
        calcLessonItems,
        calcLessonPrice,
        calcTotalItems,
        calcTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useCart = () => useContext(CartContext)
