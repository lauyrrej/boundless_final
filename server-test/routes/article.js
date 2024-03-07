import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// 取得所有組團資料
router.get("/article", async (req, res, next) => {
  try {
    let [article] = await db.execute("SELECT * FROM article");

    if (article) {
      res.json(article);
      console.log(article);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});



export default router;
