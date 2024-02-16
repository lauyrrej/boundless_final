import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="d-flex align-items-center justify-content-center">
        Copyright © 2023 Boundless. All rights reserved.
      </footer>

      <style jsx>
        {`
          footer {
            background-color: #000;
            color: #fff;
            width: 100%;
            height: 45px;
            font-size: 16px;
          }
        `}
      </style>
    </>
  )
}
