import React from 'react'
import { IoMdHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Breadcrumb() {
  return (
    <>
      {/* 麵包屑 */}
      <div className="breadcrumb-wrapper m-0 p-0">
        <ul className="d-flex align-items-center p-0 m-0">
          <IoMdHome />
          <li style={{ marginLeft: '8px' }}>樂友論壇</li>
          <IoIosArrowForward />
          <li style={{ marginLeft: '8px' }}>文章資訊</li>
        </ul>
      </div>
      <style jsx>{`

      `}</style>
    </>
  )
}
