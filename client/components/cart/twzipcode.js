import { useState } from 'react'

export default function Twzipcode() {
  const [countryIndex, setCountryIndex] = useState(-1)
  const [townshipIndex, setTownshipIndex] = useState(-1)

  return (
    <>
      <select
        className="form-select"
        name="country"
        id="country"
        value={countryIndex}
        onChange={(e) => {
          setCountryIndex(e.target.value)
        }}
      >
        <option value="" selected="">
          台北市
        </option>
      </select>
    </>
  )
}
