export default function LessonCouponDropdowns({
  lessonCoupons,
  handleLessonSelector,
}) {
  const coupons = lessonCoupons.map((v) => {
    return (
      <option key={v.id} value={v.discount}>
        {v.name}
      </option>
    )
  })

  
  let select = localStorage.getItem('LessonCoupon')

  

  return (
    <>
      <select
        id="lessonCoupons"
        className="form-select"
        aria-label="Default select example"
        defaultValue={'Default'}
        value={select}
        onChange={(e) => {
          handleLessonSelector(e.target.value)
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
