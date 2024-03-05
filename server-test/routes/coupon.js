import express from "express";
import db from "../db.js";

const router = express.Router();

//整包coupon
router.get("/", async (req, res) => {
  try {
    let [coupon] = await db.execute("SELECT * FROM `product` WHERE `type` = 2");

    if (coupon) {
      res.json(coupon);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

//coupon_kind
router.get("/categories", async (req, res) => {
  try {
    let [lesson_category] = await db.execute(
      "SELECT * FROM `lesson_category` "
    );

    if (lesson_category) {
      res.json(lesson_category);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

// // 商品列表路由，根據分類返回相應商品列表
// router.get("/?category=${categoryId}", (req, res) => {
//   const { category } = req.query;
//   const query = "SELECT * FROM `product` WHERE `lesson_category_id` = ?"; // 假設您的商品表為 products，並且有一個字段為 category
//   db.query(query, [category], (err, results) => {
//     if (err) {
//       console.error("Error querying database:", err);
//       res.status(500).json({ error: "Internal server error" });
//       return;
//     }
//     res.json(results);
//   });
// });

export default router;
