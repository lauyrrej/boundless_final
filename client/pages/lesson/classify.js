import React, { useState } from 'react'

// 假設這是您的商品資料

export const ProductList = () => {
  const products = [
    { id: 1, name: '知名歌手的老師 幫你歌聲大改造', category: '歌唱技巧' },
    {
      id: 2,
      name: '樂理指法一把抓 - 鋼琴基礎從零開始',
      category: '樂器演奏',
    },
    { id: 3, name: '吉他從零開始 - 初級篇', category: '音樂理論' },
    {
      id: 4,
      name: 'SV 科學歌唱｜用運動科學高效學唱歌',
      category: '詞曲創作',
    },
    { id: 4, name: 'Logic Pro X 從零開始', category: '軟體操作' },

    // 其他商品...
  ]
    //設定狀態改變
  const [selectedCategory, setSelectedCategory] = useState('全部') // 預設選擇全部分類
  const categories = ['全部', '歌唱技巧', '樂器演奏', '音樂理論', '軟體操作'] // 假設這是您的分類列表
//切換
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // 根據選擇的分類過濾商品
  const filteredProducts =
    selectedCategory === '全部'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  return (
    <div>
      {/* 分類選擇器 */}
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* 商品列表 */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
