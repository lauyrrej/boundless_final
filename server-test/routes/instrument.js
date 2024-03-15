import express, { json } from "express";
import db from "../db.js";
import multer from "multer";


const router = express.Router();
const upload = multer();

// 取得所有樂器資料
router.get("/", async (req, res, next) => {
    try {
     // 执行SQL查询，获取产品及其对应的乐器类别名称
let [instrument] = await db.execute(`
SELECT 
    product.*, 
    instrument_category.name AS category_name 
FROM 
    product 
JOIN 
    instrument_category 
ON 
    product.instrument_category_id = instrument_category.id 
WHERE 
    type = 1
`);

// 变量instrument现在包含了查询结果
        if (instrument) {
          res.json(instrument);
        //  console.log(instrument);
        } else {
          res.json("沒有找到相應的資訊");
        }
      } catch (error) {
        console.error("發生錯誤：", error);
        res.json("發生錯誤");
      }

        // 取得資料總筆數，用於製作分頁
      //  let [dataCount] = await db
      //  .execute("SELECT * FROM `product` WHERE `type` = 1")
      //  .catch(() => {
      //   return undefined;
      // });
   
   

    
  // let page = Number(req.query.page) || 1; // 目前頁碼
  // let dataPerpage = 20; // 每頁20筆
  // let offset = (page - 1) * dataPerpage; // 取得下一批資料
  // let pageTotal = Math.ceil(dataCount.length / dataPerpage); // 計算總頁數
  // let pageString = " LIMIT " + offset + "," + dataPerpage;
  });



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

 // 獲得單筆樂器資料＋review
 // 檢索屬於特定 puid 的產品，並且通過左連接獲取與之相關聯的產品評論
 router.get("/:id", async (req, res, next) => {
  let puid = req.params.id;
  console.log(puid);
  let [data] = await db.execute(
    "SELECT p.*, pr.*, ic.name AS category_name " +
    "FROM `product` AS p " +
    "LEFT JOIN `product_review` AS pr ON p.id = pr.product_id " +
    "LEFT JOIN `instrument_category` AS ic ON p.instrument_category_id = ic.id " +
    "WHERE p.`puid` = ?",
    [puid]
  )  
   .catch(() => {
    return undefined;
  });

  if (data) {
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(400).send("發生錯誤");
  }
});
    


// 獲得單筆樂器資料
// router.get("/:id", async (req, res, next) => {
//   let puid = req.params.id;
//   console.log(puid);
//   let [data] = await db
//     .execute("SELECT * FROM `product` WHERE `puid` = ? ", [puid])
//     .catch(() => {
//       return undefined;
//     });

//   if (data) {
//     console.log(data);
//     res.status(200).json(data);
//   } else {
//     res.status(400).send("發生錯誤");
//   }
// });
function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)

  // Input Filter
  const [query, setQuery] = useState("")
  const handleInputChange = event => {
    setQuery(event.target.value)
  }
} 

export default router;
