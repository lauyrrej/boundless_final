import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ArticleCard from '@/components/article/article-card'

export default function Test() {
  const [article, setArticle] = useState([])

  useEffect(() => {
    const getDatas = async () => {
      try {
        const res = await fetch(`http://localhost:3005/api/article`)
        const datas = await res.json()
        if (datas) {
          setArticle(datas) // 設定獲取的文章數據到狀態中
        }
      } catch (e) {
        console.error(e)
      }
    }
    getDatas() // 在元件渲染後立即獲取文章數據
  }, []) // 空的依賴陣列表示只在元件第一次渲染時執行一次
  return (
    <>
      <div className="content-pop d-flex flex-wrap">
        {article.slice(0, 4).map((v, i) => {
          const {
            id,
            auid,
            title,
            content,
            img,
            author,
            articles,
            fav,
            category_id,
          } = v
          return (
            <ArticleCard
              key={id}
              auid={auid}
              id={id}
              title={title}
              content={content}
              img={img}
              author={author}
              category_id={category_id}
              articles={articles}
              fav={fav}
            />
          )
        })}
      </div>
    </>
  )
}
