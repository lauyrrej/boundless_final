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

//     try {
//         const page = parseInt(req.query.page) || 1; // 從 URL 參數中獲取頁碼，默認為第1頁
//         const perPage = 8; // 每頁顯示的商品數量
//         const startIndex = (page - 1) * perPage;

//         // 查詢資料庫，取得符合條件的商品
//         const query = `SELECT * FROM products WHERE type = 2 LIMIT ${startIndex}, ${perPage}`;

//          const [results] = await db.execute(query);

//                 res.json({
//                     products: results,
//                 });
//     }catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).send("Internal Server Error");
//   }
});
    
    // try {
    //     let [lesson] = await db.execute(
    //         `SELECT * FROM product WHERE type = 2 LIMIT ${startIndex},${pageSize}`
    //     );

    //     if (lesson) {
    //         res.json(lesson);
    //     } else {
    //         res.json("沒有找到相應的資訊");
    //     }
    // } catch (error) {
    //     console.error("發生錯誤：", error);
    //     res.json("發生錯誤");
    // }



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
router.get("/category/:category", async (req, res) => {
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

// 獲得單筆課程資料＋review
router.get("/:id", async (req, res, next) => {
  let luid = req.params.id;
  console.log(luid);
  let [data] = await db
    .execute(
      "SELECT p.*, pr.* FROM `product` AS p LEFT JOIN `product_review` AS pr ON p.id = pr.product_id WHERE p.`puid` = ?",
      [luid]
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

// 獲得單筆課程資料
router.get("/:id", async (req, res, next) => {
  let luid = req.params.id;
  console.log(luid);
  let [data] = await db
    .execute("SELECT * FROM `product` WHERE `puid` = ? ", [luid])
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

//   // 排序用
//   let orderDirection = req.query.order || "ASC";

export default router;
