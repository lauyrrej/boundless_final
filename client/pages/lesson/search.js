import React, { useState } from 'react'

// 商品列表组件
function ProductList({ products, searchKeyword }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

// 搜索栏组件
function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  const handleChange = (event) => {
    setKeyword(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={handleChange}
      />
    </div>
  )
}

// 主组件
function App() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [products] = useState([
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ])

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ProductList products={products} searchKeyword={searchKeyword} />
    </div>
  )
}

export default App
