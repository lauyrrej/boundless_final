import { createContext, useContext, useState, useEffect } from 'react'
import CartData from '@/data/cart/cart.json'
import CouponData from '@/data/cart/coupons.json'

export const CartContext = createContext()

export function CartProvider({ children }) {
  let cartData = CartData.map((v) => {
    // if (v.type == 1) {
    //   return { ...v, qty: 1 }
    // } else {
    //   return v
    // }
    return { ...v, qty: 1 }
  })
  //加入到購物車的項目
  let [items, setItems] = useState(cartData)

  useEffect(() => {
    localStorage.setItem('CartData', JSON.stringify(items))
  }, [items])

  // 新增商品至購物車
  const addInstrumentItem = (item, qty) => {
    // 檢查購物車是否已存在該商品
    const index = items.findIndex((v) => {
      return (v.id == item.id)
    })
    console.log(index);
    if (index > -1) {
      increment(item, qty)
    }else{
      // 不存在購物車中，擴充該商品的"數量"屬性
      //擴充item的屬性多一個qty
      const newItem = { ...item, qty: qty }
      const newItems = [...items, newItem]
      setItems(newItems)
      localStorage.setItem('CartData', JSON.stringify(newItems))
    }

  }

  const addLessonItem = (item) => {
    const index = items.findIndex((v) =>{
      return (v.id == item.id)
    })

    if(index == -1){
      const newItem = {...item, qty: 1}
      const newItems = [...items, newItem]
      setItems(newItems)
      localStorage.setItem('CartData', JSON.stringify(newItems))
    }
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
  const increment = (item, qty) => {
    const newItems = items.map((v) => {
      if (v.id === item.id) return { ...v, qty: v.qty + qty }
      else return v
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  const increment_cart = (items, id) => {
    const newItems = items.map((v) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })

    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  //遞減某商品id數量
  const decrement = (item) => {
    const newItems = items.map((v, i) => {
      if (v.id === item.id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setItems(newItems)

    localStorage.setItem('CartData', JSON.stringify(newItems))
  }

  const decrement_cart = (items, id) => {
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
    total=items.length
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
    localStorage.setItem('LessonCoupon', e)
    setLessonDiscount(e)
  }

  const [instrumentDiscount, setinstrumentDiscount] = useState(0)

  const handleInstrumentSelector = (e) => {
    localStorage.setItem('InstrumentCoupon', e)
    setinstrumentDiscount(e)
  }

  useEffect(() => {
    const lastInstrumentCoupon = JSON.parse(
      localStorage.getItem('InstrumentCoupon') ?? '[]'
    )
    setinstrumentDiscount(lastInstrumentCoupon)
  }, [])

  // const [name, setName] = useState('')
  // const [phone, setPhone] = useState('')
  // const [email, setEmail] = useState('')
  // const [address, setAddress] = useState('')

  // const UserInfo = (e) => {

  //   let UserInfo = JSON.stringify([
  //     { Name: name, Phone: phone, Email: email, Address: address },
  //   ])
  //   setName(e.target.value)
  //   setPhone(e.target.value)
  //   setEmail(e.target.value)
  //   setAddress(e.target.value)
  //   // useEffect(() => {
  //   //   localStorage.setItem('UserInfo', UserInfo)
  //   // }, [UserInfo])
  // }

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
        increment_cart,
        decrement,
        decrement_cart,
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
