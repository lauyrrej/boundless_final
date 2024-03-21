import express, { json } from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// 取得所有樂器資料
// instrument?page=1&order=ASC&brandSelect=1&priceLow=&priceHigh=&score=all&sales=false&keyword=
router.get('/', async (req, res, next) => {
  //  console.log(req.query);
  // return
  // let priceLow = req.query.priceLow;
  // let priceHigh = req.query.priceHigh;
  let priceLow = req.query.priceLow !== undefined ? req.query.priceLow : ''; // 如果沒有提供查詢參數，則賦值為空字符串
  let priceHigh = req.query.priceHigh !== undefined ? req.query.priceHigh : '';
  console.log(priceLow);
  console.log(priceHigh);


  // 取得所有樂器分類資料
  const [category] = await db.execute(
    'SELECT `id`, `parent_id`, `name` FROM `instrument_category`'
  );


  let [instrument] = await db
    .execute(
      `SELECT product.*, instrument_category.name AS category_name 
  FROM product 
  JOIN instrument_category 
  ON product.instrument_category_id = instrument_category.id 
  WHERE type = 1`
    )
    .catch((error) => {
      console.log(error);
      return undefined;
    });
    


  let page = Number(req.query.page) || 1; // 目前頁碼
  let dataPerpage = 20; // 每頁 20 筆
  let offset = (page - 1) * dataPerpage; // 取得下一批資料
  let pageTotal = Math.ceil(instrument.length / dataPerpage); // 計算總頁數
  let pageString = ' LIMIT ' + offset + ',' + dataPerpage;

  // 排序用
  let orderDirection = req.query.order || 'ASC';


   let finalData;
   let finalInstrument=instrument;
  if (Object.keys(req.query).length !== 0) {
    // 所有篩選條件，預設條件: type=1(樂器)
    let sqlString = 'SELECT * FROM `product` WHERE `type` = 1';
    const brandSelect =
      req.query.brandSelect !== 'all'
        ? ' AND `brand_id` = ' + parseInt(req.query.brandSelect)
        : '';

    const priceLow =
      req.query.priceLow != '' && !isNaN(parseInt(req.query.priceLow))
        ? ' AND `price` >= ' + parseInt(req.query.priceLow)
        : '';

    const priceHigh =
      req.query.priceHigh != '' && !isNaN(parseInt(req.query.priceHigh))
        ? ' AND `price` <= ' + parseInt(req.query.priceHigh)
        : '';

    const score =''
      // req.query.score !== 'all'
      // ? ' AND `score` = ' + parseInt(req.query.score)
      // : '';
     
    const promotion =
     req.query.promotion !== 'true'
     ? " AND `discount_state` = 0"
     : " AND `discount_state` = 1"


    sqlString += brandSelect + priceLow + priceHigh + score + promotion + ' ORDER BY `price` ' + orderDirection;
    console.log(sqlString)
    const [instrument2] = await db.execute(sqlString).catch(() => {
      return [];
    })
    finalInstrument= instrument2

    page = Number(req.query.page) || 1; // 目前頁碼
    dataPerpage = 20; // 每頁 20 筆
    offset = (page - 1) * dataPerpage; // 取得下一批資料
    if (instrument2) {
    pageTotal = Math.ceil(instrument2.length / dataPerpage); // 計算總頁數
    }
    pageString = ' LIMIT ' + offset + ',' + dataPerpage;

   sqlString += pageString;
   const [data] = await db.execute(sqlString).catch(() => {
    return [];
  });

    finalData=data
  }else{
      // 沒有篩選條件
    const [data] = await db 
    .execute(
      'SELECT * FROM `product` WHERE `type` = 1 ORDER BY `price` ASC LIMIT 0, 20',
    )
    .catch(() => {
      return undefined;
    })

    finalData=data
  }
if (finalData){
   // 整理資料，把字串轉成陣列或物件
  //  const instrumentData = data.map((v) => {
  //  // priceLow可能為空值，先令其為空陣列
  //  // priceHigh可能為空值，先令其為空陣列
  //   //  const priceLow = v.priceLow || 0; // 使用預設值 0
  //   // const priceHigh = v.priceHigh || 0; // 使用預設值 0
  //   const productCategory = JSON.parse(v.productCategory|| '{}'); // 使用空物件作為預設值

  //   // return {
  //   //   ...v,
  //   //   // priceLow,
  //   //   // priceHigh,
  //   //   productCategory: setProductCategory,
  //   // };
  // });

   res.status(200).json({
    instrument: finalInstrument,
    pageTotal,
    page,
  });

}else {
  res.status(400).send('發生錯誤');
}
});
  // const instrument_category_id = req.query.instrument_category_id
  // const brand = req.query.brandSelect;
  // console.log(brand)
  //     try {
  //      // 执行SQL查询，获取产品及其对应的乐器类别名称

  //      let [instrument] = await db.execute(`
  //      SELECT product.*, instrument_category.name AS category_name
  //      FROM product
  //      JOIN instrument_category
  //      ON product.instrument_category_id = instrument_category.id
  //      WHERE type = 1
  //      `)
  //      let [instrument] = await db.execute(`
  //      SELECT product.*, instrument_category.name AS category_name
  //      FROM product
  //      JOIN instrument_category
  //      ON product.instrument_category_id = instrument_category.id
  //      WHERE type = 1
  //      `)

  // if(brand !== 'all'){
  //      [instrument] = await db.execute(`
  //      SELECT product.*, instrument_category.name AS category_name
  //      FROM product
  //      JOIN instrument_category
  //      ON product.instrument_category_id = instrument_category.id
  //      WHERE product.type = 1 AND product.instrument_category_id = ? AND product.brand_id = ?;
  //      `, [instrument_category_id, brand])}
  //      else{
  //        [instrument] = await db.execute(`
  //      SELECT product.*, instrument_category.name AS category_name
  //      FROM product
  //      JOIN instrument_category
  //      ON product.instrument_category_id = instrument_category.id
  //      WHERE type = 1
  //      `)};
  // // 变量instrument现在包含了查询结果
  //         if (instrument.length > 0) {
  //           res.json(instrument);
  //         //  console.log(instrument);
  //         } else {
  //           res.json("沒有找到相應的資訊");
  //         }
  //       } catch (error) {
  //         console.error("發生錯誤：", error);
  //         res.json("發生錯誤");
  //       }


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
// const order = getOrder(orderby)


//instrument_category
router.get('/categories', async (req, res) => {
  try {
    let [instrument_category] = await db.execute(
      'SELECT `id`, `parent_id`, `name` FROM `instrument_category`'
    );

    if (instrument_category) {
      res.json(instrument_category);
    } else {
      res.json('沒有找到相應的資訊');
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.json('發生錯誤');
  }
});


//特定分類的資料
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);
    let [instrument] = await db.execute(
      'SELECT * FROM `product` ,  instrument_category.name AS category_name  WHERE `product.puid` = ?',
      [category]
    );

    if (instrument.length > 0) {
      res.json(instrument);
    } else {
      res.json('沒有找到相應的資訊');
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.json('發生錯誤');
  }
});


// 檢索屬於特定 puid 的產品，並且通過左連接獲取與之相關聯的產品評論
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
router.get('/:id', async (req, res, next) => {
  let puid = req.params.id;
  console.log(puid);
  try {
    // 商品詳細資料
    // 商品詳細資料
    let [data] = await db.execute(
      'SELECT p.*, ic.name AS category_name ' +
        'FROM `product` AS p ' +
        'LEFT JOIN `instrument_category` AS ic ON p.instrument_category_id = ic.id ' +
        'WHERE p.`puid` = ?',
      [puid]
    );
    data = data[0];
    // console.log(data);

    let [reviewData] = await db.execute(
      'SELECT `product_review`.*, `user`.uid, `user`.name, `user`.nickname, `user`.img FROM `product_review` JOIN `user` ON `product_review`.user_id = `user`.id WHERE `product_review`.product_id = ?',
      [data.id]
    );
    // console.log(reviewData);

    let [youmaylike] = await db.execute(
      'SELECT p.*, instrument_category.name AS category_name FROM `product` AS p ' +
        'JOIN `instrument_category` ' +
        'ON p.`instrument_category_id` = instrument_category.id WHERE instrument_category.id =  (SELECT `instrument_category_id` FROM `product` WHERE `puid` = ?) LIMIT 0,5',
      [puid]
    );

    if ({ data, youmaylike }) {
      // console.log({ data });
      res.status(200).json({ data, reviewData, youmaylike });
    } else {
      res.status(400).send('發生錯誤');
    }
  } catch (error) {
    if ({ data, youmaylike }) {
      // console.log({ data });
      res.status(200).json({ data, reviewData, youmaylike });
    } else {
      res.status(400).send('發生錯誤');
    }
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
// }

export default router;