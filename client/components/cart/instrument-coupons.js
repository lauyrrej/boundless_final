import { Lekton } from "next/font/google"
import { useState } from "react"
export default function InstrumentCouponDropdowns({
  instrumentCoupons,
  handleInstrumentSelector,
}) {
  const coupons = instrumentCoupons.map((v) => {
    return (
      <option key={v.id} value={v.discount} name={v.name}>
        {v.name}
      </option>
    )
  })
  



let select = ()=>{
  if(typeof localStorage !== 'undefined'){
   return  localStorage.getItem('InstrumentCoupon')
  }else{
   return ''
  }
 }




  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue={'Default'}
        value={select()}
        onChange={(e) => {
          handleInstrumentSelector(e.target.value)
        }}
      >
        <option value={'Default'} disabled>
          請選擇折價券
        </option>
        {coupons}
      </select>
    </>
  )
}
