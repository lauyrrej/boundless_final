import React, { useState } from 'react'

function FilterableProjects({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 处理类别选择变化
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  // 根据选择的类别过滤项目
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  return (
    <div>
      {/* 下拉菜单 */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>

      {/* 显示项目列表 */}
      <ul>
        {filteredProjects.map((project) => (
          <li key={project.id} className={project.category}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
category
// 项目数据
const projects = [
  { id: 1, name: 'Project 1', : 'category1' },
  { id: 2, name: 'Project 2', category: 'category2' },
  { id: 3, name: 'Project 3', category: 'category1' },
  { id: 4, name: 'Project 4', category: 'category3' },
  { id: 5, name: 'Project 5', category: 'category2' },
]

function App() {
  return (
    <div>
      <h1>Filterable Projects</h1>
      <FilterableProjects projects={projects} />
    </div>
  )
}

export default App
