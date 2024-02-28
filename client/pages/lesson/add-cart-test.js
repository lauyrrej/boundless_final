import React, { useState } from 'react'

const ProductDetailPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
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
    showMessageWithDelay(`${product.name}已加入購物車中`)
  }

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId)
    const removedItem = cartItems.find((item) => item.id === productId)
    setCartItems(updatedCartItems)
    setCartCount(cartCount - removedItem.quantity)
    showMessageWithDelay(`${removedItem.name}已從購物車中移除`)
  }

  const showMessageWithDelay = (message) => {
    setMessage(message)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
    }, 3000) // 3 seconds delay before hiding the message
  }

  return (
    <div>
      <h1>商品詳細頁面</h1>
      <div>
        <img src="product-image-url" alt="Product Image" />
        <button
          onClick={() => addToCart({ id: 1, name: '商品名稱', price: 100 })}
        >
          加入購物車
        </button>
        <button
          onClick={() =>
            removeFromCart({ id: 1, name: '商品名稱', price: 100 })
          }
        >
          移除購物車
        </button>
      </div>
      <div>
        <span>購物車</span>
        <span>數量: {cartCount}</span>
        <span onClick={() => setShowCart(true)}>查看購物車</span>
      </div>
      {showMessage && <div className="message-box">{message}</div>}
    </div>
  )
}

export default ProductDetailPage
