import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// 取得所有組團資料
router.get("/", async (req, res, next) => {
    try {
        let [instrument] = await db.execute("SELECT * FROM product WHERE type = 1");
    
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
});



export default router;
