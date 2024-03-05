const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(bodyParser.json())

// 設定MySQL連線
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database',
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to database')
})

// 建立路由來獲取所有產品
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM product'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// 啟動伺服器
app.listen(3000, () => {
  console.log('Server started on port 3000')
})
