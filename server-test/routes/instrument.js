import express, { json } from "express";
import db from "../db.js";
import multer from "multer";


const router = express.Router();
const upload = multer();

// 取得所有樂器資料
// instrument?page=1&order=ASC&brandSelect=1&priceLow=&priceHigh=&score=all&sales=false&keyword=
router.get("/", async (req, res, next) => {

const instrument_category_id = req.query.instrument_category_id
const brand = req.query.brand;
console.log(brand)
    try {
     // 执行SQL查询，获取产品及其对应的乐器类别名称
// let [instrument] = await db.execute(`
// SELECT product.*, instrument_category.name AS category_name 
// FROM product 
// JOIN instrument_category 
// ON product.instrument_category_id = instrument_category.id 
// WHERE type = 1
// `)

// if(brand){
    [instrument] = await db.execute(`
     SELECT product.*, instrument_category.name AS category_name 
     FROM product 
     JOIN instrument_category 
     ON product.instrument_category_id = instrument_category.id 
     WHERE type = 1 AND instrument_category_id = ? AND brand_id = ?;
     `, [instrument_category_id, brand]);
// 变量instrument现在包含了查询结果
        if (instrument.length > 0) {
          res.json(instrument);
        //  console.log(instrument);
        } else {
          res.json("沒有找到相應的資訊");
        }
      } catch (error) {
        console.error("發生錯誤：", error);
        res.json("發生錯誤");
      }
    });

    // router.get("/getDatassearch", async (req, res, next) => {
    //   console.log(req.query)
    //   const {type, instrument_category_id, brand}=req.query
     
    //      try {
    //       // 执行SQL查询，获取产品及其对应的乐器类别名称
    //  let [instrument] = await db.execute(`
    //  SELECT product.*, instrument_category.name AS category_name 
    //  FROM product 
    //  JOIN instrument_category 
    //  ON product.instrument_category_id = instrument_category.id 
    //  WHERE type = ? AND instrument_category_id = ? AND brand_id = ?;
    //  `, [type, instrument_category_id, brand]);
     
    //  // 变量instrument现在包含了查询结果
    //          if (instrument) {
    //            res.json(instrument);
    //          //  console.log(instrument);
    //          } else {
    //            res.json("沒有找到相應的資訊");
    //          }
    //        } catch (error) {
    //          console.error("發生錯誤：", error);
    //          res.json("發生錯誤");
    //        }
    //      });
//    const {
//     page,
//     orderby,
//     brandSelect,
//     priceLow,
//     priceHigh,
//     score,
//     promotion,
//     keyword,
//    } = req.query

//    // TODO: 這裡可以檢查各query string正確性或給預設值，檢查不足可能會產生查詢錯誤
//    // 建立資料庫搜尋條件
//    const conditions = []

//  // 關鍵字，keyword 使用 `name LIKE '%keyword%'`
//  conditions[0] = keyword ? `name LIKE '%${keyword}%'` : ''

//  // 品牌，brandSelect 使用 `brandSelect IN (4,5,6,7)`
//  conditions[1] = brandSelect ? `brandSelect IN (${brandSelect})` : ''

// // 評價，score 使用 `score IN (3, 4, 5)`
//  conditions[2] = score ? `cat_id IN (${score})` : ''

 





// 排序用，預設使用id, asc
  // const order = getOrder(orderby)



















//instrument_category
router.get("/categories", async (req, res) => {
  try {
    let [instrument_category] = await db.execute(
      "SELECT * FROM `instrument_category` "
    );

    if (instrument_category) {
      res.json(instrument_category);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

  //特定分類的資料
  router.get("/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
  console.log(category)
      let [instrument] = await db.execute(
        "SELECT * FROM `product` ,  instrument_category.name AS category_name  WHERE `product.puid` = ?",
          [category]
        
      );

      if (instrument.length > 0) {
        res.json(instrument);
      } else {
        res.json("沒有找到相應的資訊");
      }
    } catch (error) {
      console.error("發生錯誤：", error);
      res.json("發生錯誤");
    }
  });


 // 檢索屬於特定 puid 的產品，並且通過左連接獲取與之相關聯的產品評論
//  router.get("/:id", async (req, res, next) => {
//   let puid = req.params.id;
//   console.log(puid);
//   let [data] = await db.execute(
//     "SELECT p.*, pr.*, ic.name AS category_name " +
//     "FROM `product` AS p " +
//     "LEFT JOIN `product_review` AS pr ON p.id = pr.product_id " +
//     "LEFT JOIN `instrument_category` AS ic ON p.instrument_category_id = ic.id " +
//     "WHERE p.`puid` = ?",
//     [puid]
//   )  
//    .catch(() => {
//     return undefined;
//   });

//   if (data) {
//     console.log(data);
//     res.status(200).json(data);
//   } else {
//     res.status(400).send("發生錯誤");
//   }
// });
    


//獲得單筆樂器資料跟評論
router.get("/:id", async (req, res, next) => {
  let puid = req.params.id;
  console.log(puid);
  try {
    let [data] = await db.execute(
      'SELECT p.*, pr.*, ic.* ,u.*' +
      'FROM `product` AS p ' +
      'LEFT JOIN `product_review` AS pr ON p.id = pr.product_id ' +
      'LEFT JOIN `instrument_category` AS ic ON p.instrument_category_id = ic.id ' +
      'LEFT JOIN `user` AS u ON pr.user_id = u.id ' +
      'WHERE p.`puid` = ? AND p.`instrument_category_id` IN (' +
      'SELECT `instrument_category_id` FROM `product` WHERE `puid` = ?' +
      ')',
    [puid, puid]
  ); 

  let [youmaylike] = await db.execute(
    'SELECT p.* FROM `product` AS p ' +
      'JOIN (SELECT `instrument_category_id` FROM `product` WHERE `puid` = ?) AS icn ' +
      'ON p.`instrument_category_id` = icn.`instrument_category_id`',
    [puid]
  );


  if ({ data, youmaylike }) {
    console.log({data});
    res.status(200).json({ data, youmaylike });
  } else {
    res.status(400).send("發生錯誤");
  }
  }catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal server error');
  }
});


// function App() {
//   const [selectedBrand, setSelectedBrand] = useState(null)

//   // Input Filter
//   const [query, setQuery] = useState("")
//   const handleInputChange = event => {
//     setQuery(event.target.value)
//   }
// } 

export default router;
