import React from 'react'
import { IoCart, IoMenu } from 'react-icons/io5'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import logoMb from '@/assets/logo_mb.svg'

export default function Navbar() {
  return (
    <>
      <header className="w-100 d-flex justify-content-between align-items-center">
        <a href="#">
          <Image src={logo} alt="logo" className="d-none d-sm-block logo" />
        </a>
        <a href="">
          <Image src={logoMb} alt="logo-mobile" className="d-sm-none logo-mb" />
        </a>

        <nav className="navbar-wrapper">
          <ul className="navbar d-none d-sm-flex justify-content-between flex-row">
            <li>
              <a href="/lesson">探索課程</a>
            </li>
            <li>
              <a href="/instrument">樂器商城</a>
            </li>
            <li>
              <a href="/jam">Let&apos;s JAM!</a>
            </li>
            <li>
              <a href="/article">樂友論壇</a>
            </li>
            <li className="ms-3">
              <a href="/cart">
                <IoCart size={30} className="cart-icon" />
              </a>
            </li>
            <li className="login-state d-flex justify-content-center">
              <a className="" href="/login">
                登入/註冊
              </a>
              {/* 用戶頭像 */}
              <div className="user-img d-none">
                <Image src={logoMb} />
              </div>
            </li>
          </ul>
          {/* 手機版 navbar */}
          <div className="navbar-mb d-sm-none d-flex justify-content-end align-items-center">
            <a href="/cart" className="p-0 me-3">
              <IoCart size={30} />
            </a>
            <IoMenu size={30} className="ms-3" />
          </div>
        </nav>
      </header>
    </>
  )
}
