import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ProductDetailPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      const newItem = { ...product, quantity: 1 }
      setCartItems([...cartItems, newItem])
    }
    setCartCount(cartCount + 1)
      toast(`${product.name}已加入購物車中`)
  }

  const removeFromCart = (productId) => {
    // 省略移除商品的邏輯
    toast.error(`${removedItem.name}已從購物車中移除`)
  }

  return (
    <div>
      <h1>商品詳細頁面</h1>
      <button
        onClick={() => addToCart({ id: 1, name: '商品名稱', price: 100 })}
      >
        加入購物車
      </button>
      <div>購物車數量: {cartCount}</div>
      <Toaster />
    </div>
  )
}

export default ProductDetailPage
