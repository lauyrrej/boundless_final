import { createContext, useContext, useState, useEffect } from 'react'
import CartData from '@/data/cart/cart.json'
import CouponData from '@/data/cart/coupons.json'

export const CartContext = createContext()

export function CartProvider({ children }) {
  let cartData = CartData.map((v) => {
    if (v.type == 1) {
      return { ...v, qty: 1 }
    } else {
      return v
    }
  })
  //加入到購物車的項目
  let [items, setItems] = useState(cartData)

  useEffect(() => {
    localStorage.setItem('CartData', JSON.stringify(items))
  }, [items])

  const addInstrumentItem = (item, qty) => {
    //擴充item的屬性多一個qty
    const newItem = { ...item, qty: qty }
    const newItems = [...items, newItem]

    setItems(newItems)
    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  const addLessonItem = (item) => {
    const newItems = [...items, item]

    setItems(newItems)
    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //在購物車中，移除某商品的id
  const remove = (items, id) => {
    const newItems = items.filter((v, i) => {
      return v.id !== id
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //遞增某商品id數量
  const increment = (items, id) => {
    const newItems = items.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //遞減某商品id數量
  const decrement = (items, id) => {
    const newItems = items.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
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
    localStorage.setItem('InstrumentCoupon', JSON.stringify(e))
    setinstrumentDiscount(e)
  }

  useEffect(() => {
    const lastInstrumentCoupon = 0
  })

  const calcLessonDiscount = () => {
    let total = 0
    total =
      lessonDiscount < 1 && lessonDiscount !== 0
        ? calcLessonPrice() - lessonDiscount * calcLessonPrice()
        : lessonDiscount
    return total
  }

  const calcInstrumentDiscount = () => {
    let total = 0
    total =
      instrumentDiscount < 1 && instrumentDiscount !== 0
        ? calcInstrumentPrice() - calcInstrumentPrice() * instrumentDiscount
        : instrumentDiscount
    return total
  }

  const calcTotalDiscount = () => {
    let total = 0
    parseInt(calcInstrumentDiscount())
    total = parseInt(calcInstrumentDiscount()) + parseInt(calcLessonDiscount())
    return total
  }

  function MySelect() {
    const [selected, setSelected] = useState([])
    const handleChange = (v) => {
      localStorage.setItem('SelectCoupons', JSON.stringify(v))
      setSelected(v)
    }
    useEffect(() => {
      const lastSelected = JSON.parse(
        localStorage.getItem('SelectCoupons') ?? '[]'
      )
      setSelected(lastSelected)
    }, [])
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
        addLessonItem,
        addInstrumentItem,
        increment,
        decrement,
        remove,
        calcInstrumentItems,
        calcInstrumentPrice,
        calcInstrumentDiscount,
        calcLessonItems,
        calcLessonPrice,
        calcLessonDiscount,
        calcTotalItems,
        calcTotalPrice,
        calcTotalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
