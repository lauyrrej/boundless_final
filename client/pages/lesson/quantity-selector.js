import React from 'react'

const CounterDisplay = ({ value }) => (
  <div className="counter-display">{value}</div>
)

const InventoryStatus = () => <div className="inventory-status">暫無庫存</div>

const ProductCounter = () => {
  return (
    <section>
      <div className="product-counter-wrapper">
        <div className="counter-action">
          <div className="decrement">－</div>
          <CounterDisplay value={1} />
          <div className="increment">＋</div>
        </div>
        <InventoryStatus />
      </div>
      <style jsx>{`
        .product-counter-wrapper {
          align-self: stretch;
          display: flex;
          max-width: 560px;
          justify-content: space-between;
          gap: 20px;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .product-counter-wrapper {
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .counter-action {
          display: flex;
          gap: 0px;
          font-size: 16px;
          color: #000;
          font-weight: 700;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .counter-action {
            white-space: initial;
          }
        }
        .decrement,
        .increment {
          font-family: Noto Sans TC, -apple-system, Roboto, Helvetica,
            sans-serif;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          border: 1px solid #b9b9b9;
          background-color: #fff;
          aspect-ratio: 1;
          height: 40px;
          padding: 0 12px;
        }
        .-display {
          font-family: Noto Sans TC, -apple-system, Roboto, Helvetica,
            sans-serif;
          justify-content: center;
          border-top: 1px solid #b9b9b9;
          border-bottom: 1px solid #b9b9b9;
          background-color: #fff;
          flex-grow: 1;
          padding: 9px 34px;
        }
        .inventory-status {
          color: #124365;
          align-self: start;
          margin-top: 8px;
          flex-grow: 1;
          flex-basis: auto;
          font: 400 20px Noto Sans TC, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
      `}</style>
    </section>
  )
}

export default ProductCounter
