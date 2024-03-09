export default function InstrumentCouponDropdowns({
  instrumentCoupons,
  instrumentDiscount,
  handleInstrumentSelector,
}) {
  const coupons = instrumentCoupons.map((v) => {
    return (
      <option key={v.id} value={v.discount}>
        {v.name}
      </option>
    )
  })

  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue={'Default'}
        value={instrumentDiscount}
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
