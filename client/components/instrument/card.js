import React from 'react'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import category from '@/data/instrument/instrument_category.json'

export default function InstrumentCard({
  id,
  pname,
  price,
  discount,
  categoryID,
  img_small,
  sales,
}) {
//   const categoryName = category.find((v, i) => {
//     return categoryID === v.id
//   })
//   // console.log(categoryName.name)
//   // console.log('categoryName:', categoryName)
//   // console.log(
//   //   'categoryName.name:',
//   //   categoryName ? categoryName.name : 'Category not found'
//   // )
//   console.log(categoryName.name)

  return (
    <>
      <article className="product-card">
        <div className="product-image-wrapper">
          <Image
            loading="lazy"
            // srcSet={productImage}
            alt={pname}
            className="product-image"
            fill
          />
          <FaHeart />
        </div>
        <div className="product-details">
          <h3 className="product-title">{pname}</h3>
          <p className="product-price">{}</p>
          <p className="product-sold mt-sm-4 mt-1">已售出 {}</p>
        </div>
        <style jsx>{`
          .product-card {
            max-width: 240px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #b9b9b9;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            padding: 8px;
            @media screen and (max-width: 576px) {
              width: 190px;
            }
          }
          .product-image-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            position: relative;
            aspect-ratio: 1.33;
            width: 100%;
          }
          .product-image,
          .icon-image {
             {
              /* width: 100%; */
            }
            object-fit: contain;
          }
          .icon-image {
            position: absolute;
            width: 20px;
            bottom: 12px;
            right: 12px;
          }
          .product-details {
            display: flex;
            flex-direction: column;
            color: #1d1d1d;
            font-weight: 400;
            padding: 14px 12px;
          }
          .product-title {
            font-size: 16px;
            font-family: Noto Sans TC, sans-serif;
            margin: 0;
          }
          .product-price {
            font-size: 18px;
            font-family: Noto Sans TC, sans-serif;
            font-weight: 700;
            margin-top: 11px;
          }
          .product-sold {
            color: #5a5a5a;
            text-align: right;
            font-size: 14px;
            font-family: Noto Sans TC, sans-serif;
             {
              /* margin-top: 46px; */
            }
          }
          .products-container {
            flex: 0 0 50%;
          }
        `}</style>
      </article>
    </>
  )
}

// Usage of ProductCard component with hypothetical data
// function ProductsContainer() {
//   const products = [
//     {
//       productName: 'Fender Telecaster model 1970',
//       productPrice: 'NT$ 22,680',
//       productSold: 10,
//       productImage: 'path/to/telecaster.jpg',
//       iconImage: 'path/to/icon.jpg',
//     },
//     // Add more products as needed
//   ]

//   return (
//     <section className="products-container">
//       {products.map((product, index) => (
//         <InstrumentCard
//           key={index}
//           productName={product.productName}
//           productPrice={product.productPrice}
//           productSold={product.productSold}
//           productImage={product.productImage}
//           iconImage={product.iconImage}
//         />
//       ))}
//     </section>
//   )
// }
