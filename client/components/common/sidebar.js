import React from 'react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <>
      <div className="sidebar-wrapper col-sm-2">
        <div className="sidebar">
          <ul className="d-flex flex-column">
            <li className="active">團員募集</li>
            <li>
              <Link href={'/jam/jam-list'}>活動中的JAM</Link>
            </li>
            <li>
              <Link href={'/jam/Q&A'}>什麼是JAM？</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
