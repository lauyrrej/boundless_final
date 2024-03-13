import express from "express";
import db from "../db.js";
// 用於處理文件上傳
import multer from "multer";
import Coupon from "../controller/coupon.js";

const router = express.Router();
// 創建一個 multer 中間件，用於處理文件上傳
const upload = multer();

// #region????
// //取得coupon資料-升降冪：ID、價格/百分比、日期排序
// //取得coupon資料-分頁：全部、樂器、課程、已使用
// #endregion

// 處理 GET 請求，路徑為 /public/coupon/FindAll
router.get("/FindAll/:user_id", async (req, res) => {
  try {
    const param = req.params.user_id;
    // 創建 Coupon 控制器的實例
    const obj = new Coupon();
    // 呼叫 Coupon 控制器中的 FindAll 方法來查詢所有優惠券
    const result = await obj.FindAll(parseInt(param));
    // 將查詢結果以 JSON 格式返回給客戶端
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    // 如果發生錯誤，返回 500 狀態碼和錯誤訊息
    res.status(500).json(err.message);
  }
});

// create
router.post("/Create", async (req, res) => {
  try {
    const param = req.body;
    // 前端給後端1. user_id，  2. coupon_template_id
    // {
    //   user_id: "";
    //   coupon_template_id: "";
    // }

    const obj = new Coupon();
    obj.user_id = param.user_id;
    obj.coupon_template_id = param.coupon_template_id;

    const result = await obj.Create();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/Update", async (req, res) => {
  try {
    // 從請求的 body 中獲取 id 參數
    const param = req.body.id;
    const obj = new Coupon();
    // 設置 Coupon 控制器的實例的 id 屬性為從請求中獲取的 id
    obj.id = param;
    // 呼叫 Coupon 控制器中的 Update 方法來刪除指定的優惠券
    const result = await obj.Update();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
