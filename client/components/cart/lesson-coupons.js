export default function LessonCouponDropdowns({
  lessonCoupons,
  lessonDiscount,
  handleLessonSelector,
}) {
  const coupons = lessonCoupons.map((v) => {
    return (
      <option key={v.id} value={v.discount}>
        {v.name}
      </option>
    )
  })

  return (
    <>
      <select
        id="lessonCoupons"
        className="form-select"
        aria-label="Default select example"
        defaultValue={'Default'}
        value={lessonDiscount}
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
