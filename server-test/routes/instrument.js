import express, { json } from "express";
import db from "../db.js";
import multer from "multer";


const router = express.Router();
const upload = multer();

// 取得所有樂器資料
router.get("/", async (req, res, next) => {
    try {
        let [instrument] = await db.execute("SELECT `product`.*, `instrument_category`.name AS category_name FROM `product` JOIN `instrument_category` ON `product`.instrument_category_id =  `instrument_category`.id WHERE `type` = 1");
    
        if (instrument) {
          res.json(instrument);
          console.log(instrument);
        } else {
          res.json("沒有找到相應的資訊");
        }
      } catch (error) {
        console.error("發生錯誤：", error);
        res.json("發生錯誤");
      }

    
       // 排序用
  // let orderDirection = req.query.order || "ASC";

  let data;
let page, dataPerpage, offset, pageTotal, pageString;

if (Object.keys(req.query).length !== 0) {
  // 所有篩選條件
  let sqlString = "SELECT * FROM `brand` WHERE `valid` = 1";
  
  const brandSelect =
    req.query.brandSelect !== "all"
      ? " AND `brandSelect` = " + parseInt(req.query.brandSelect)
      : "";
  
  sqlString += brandSelect;
  
  // 取得總筆數
  try {
    const [countResult] = await db.execute("SELECT COUNT(*) as total FROM `brand` WHERE `valid` = 1" + brandSelect);
    const dataCount = countResult[0].total;
    
    // 計算總頁數
    page = Number(req.query.page) || 1;
    dataPerpage = 10; // 每頁 10 筆
    offset = (page - 1) * dataPerpage; // 取得下一批資料
    pageTotal = Math.ceil(dataCount / dataPerpage); // 計算總頁數
    pageString = " LIMIT " + offset + "," + dataPerpage;
    
    sqlString += pageString;
    
    [data] = await db.execute(sqlString).catch(() => {
      return undefined;
    });
  } catch (error) {
    console.error("發生錯誤：", error);
    data = undefined;
  }
} else {
  // 沒有篩選條件
  [data] = await db.execute("SELECT * FROM `brand` WHERE `valid` = 1").catch(() => {
    return undefined;
  });
}

console.log(data);
}

);
export default router;
