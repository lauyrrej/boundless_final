import React from 'react'
import data from '@/data/Coupon.json'

export default function FetchData() {
  return (
    <div className="d-flex">
      {data.map((data, i) => (
        <div className="border m-2" key={i}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
  )
}
