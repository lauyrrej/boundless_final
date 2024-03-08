import express from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

//取得coupon資料-升降冪：ID、價格/百分比、日期排序
router.get("/", async (req, res) => {
  try {
    let [couponData] = await db.execute(
      "SELECT * FROM `coupon` WHERE `valid` = 1 ORDER BY id ASC"
      // "SELECT * FROM `coupon` ORDER BY discount DESC",
      // "SELECT * FROM `coupon` ORDER BY limit_time ASC"
    );
    if (couponData) {
      res.json(couponData);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("res.json發生錯誤");
  }
});

//取得coupon資料-分頁：全部、樂器、課程、已使用
router.get("/categories", async (req, res) => {
  try {
    let [couponData] = await db.execute(
      // "SELECT * FROM `coupon` WHERE `type` = 1 AND valid=1  "
      // "SELECT * FROM `coupon` WHERE `type` = 2 AND valid=1"
      "SELECT * FROM `coupon` WHERE `valid` = 0 ORDER BY id ASC"
    );
    if (couponData) {
      res.json(couponData);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("res.json發生錯誤");
  }
});

export default router;
