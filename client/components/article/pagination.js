import React, { useState, useEffect } from 'react';
import ArticleJson from 'data/article/article.json'

export default function Pagination() {

  const [consData, setCoinsData] = useState([])

  useEffect(async () => {
    const response = await ArticleJson.get()
    setCoinsData(response.data)
  }, [])


  return (
    <div>pagination</div>
  )
}
