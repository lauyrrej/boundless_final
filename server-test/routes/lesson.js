import express from "express";
import db from "../db.js";

const router = express.Router();

//整包product
router.get("/", async (req, res) => {
  try {
    let [lesson] = await db.execute("SELECT * FROM `product` WHERE `type` = 2");

    if (lesson) {
      res.json(lesson);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

//lesson_category
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
//特定分類的資料
router.get("/api/Lesson/:category", async (req, res) => {
  try {
    const category = req.params.category;

    let [lesson] = await db.execute(
      "SELECT * FROM `product` WHERE `lesson_category_id` = ?",
        [category]
      
    );

    if (lesson.length > 0) {
      res.json(lesson);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

 // 取得資料總筆數，用於製作分頁
//   let [dataCount] = await db
//     .execute(
//       "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND (`formed_time` IS NULL OR `formed_time` = '0000-00-00 00:00:00')",
//       [now]
//     )
//     .catch(() => {
//       return undefined;
//     });

//   let page = Number(req.query.page) || 1; // 目前頁碼
//   let dataPerpage = 10; // 每頁 10 筆
//   let offset = (page - 1) * dataPerpage; // 取得下一批資料
//   let pageTotal = Math.ceil(dataCount.length / dataPerpage); // 計算總頁數
//   let pageString = " LIMIT " + offset + "," + dataPerpage;

//   // 排序用
//   let orderDirection = req.query.order || "ASC";

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

// 獲得單筆課程資料
router.get("/:id", async (req, res, next) => {
  let lid = req.params.id;
  console.log(lid);
  let [data] = await db
    .execute("SELECT * FROM `product` WHERE `id` = ? ", [lid])
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

export default router;
