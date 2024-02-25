import React, { useState, useEffect } from 'react'

import Navbar from '@/components/common/navbar'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import { IoHome } from 'react-icons/io5'
import Card from '@/components/lesson/lesson-card'
import HoriCard from '@/components/lesson/lesson-card-hori'
import ProductCard from '@/components/lesson/lesson-productbrief-card'

function App() {
  const [isBottom, setIsBottom] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight
      const contentHeight = document.body.offsetHeight
      const scrollPosition = window.scrollY

      if (scrollPosition + windowHeight >= contentHeight) {
        setIsBottom(true)
      } else {
        setIsBottom(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // 仅在组件挂载和卸载时执行

  return (
    <div className="App">
      <div className="content">
        <h1>dsfsdf</h1>
        <p></p>

        {/* Your content goes here */}
      </div>

      <a href="#" className={"isBottom ? 'buy-button fixed' : 'buy-button'"}>
        购买
      </a>
    </div>
  )
}

export default App
