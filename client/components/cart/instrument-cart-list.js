import React from 'react'
import Instrument from '@/pages/cart/instrument-item.module.scss'
import Image from 'next/image'

//react icons
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

import InstrumentCategory from '@/data/cart/instrument_category.json'

export default function InstrumentList({
  items = [],
  increment = () => {},
  decrement = () => {},
  remove = () => {},
}) {
  const InstrumentData = items.filter((v, i) => {
    return v.type == 1
  })

  // console.log(InstrumentData);

  const categoryName = InstrumentData.map((item) => {
    const findCategoryName = InstrumentCategory.find((v, i) => {
      return v.id === item.instrument_category_id
    }).name
    return findCategoryName
  })

  // console.log(categoryName);
  return (
    <>
      <div className={`${Instrument.cartItemGroup}`}>
        {InstrumentData.map((v, i) => {
          return (
            <div className={`${Instrument.instrumentItem}`} key={v.id}>
              <div className={`${Instrument.instrument_item_pic}`}>
                <Image
                  className={`${Instrument.instrument_item_pic_div}`}
                  // src={`/instrument/類別/small/`}
                  alt={v.name}
                  fill
                />
              </div>
              <div className={`${Instrument.instrument_item_name} h6`}>
                ${v.name}
              </div>
              <div className={`${Instrument.instrument_item_price} h6`}>
                ${v.price}
              </div>
              <div className={`${Instrument.instrument_item_quantity} h6`}>
                <div className="input-group">
                  <button
                    className={`${Instrument.quantity_left_minus} btn btn-light`}
                    onClick={() => {
                      decrement(items, v.id)
                    }}
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="text"
                    className={`${Instrument.input_number} form-control`}
                    id="quantity"
                    name="quantity"
                    defaultValue={1}
                    min={1}
                    max={100}
                  />
                  <button
                    className={`${Instrument.quantity_right_plus} btn btn-primary`}
                    onClick={() => {
                      increment(items, v.id)
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className={`${Instrument.instrument_item_total} h6`}>
                ${v.price}
              </div>
              <div className={`${Instrument.instrument_button}`}>
                <button
                  type="button"
                  className={`${Instrument.delete_btn} btn`}
                  onClick={() => {
                    remove(items, v.id)
                  }}
                >
                  <div>
                    <FaTrash />
                  </div>
                  <div>刪除</div>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .h6 {
          font-family: 'Noto Sans TC';
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      `}</style>
    </>
  )
}
