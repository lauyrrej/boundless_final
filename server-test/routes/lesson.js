import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Mandatory type filter
    let baseQuery = 'SELECT * FROM `product` WHERE `type` = ? ';
    let queryParams = [2];
    // Additional filters
    const { priceLow, priceHigh, page } = req.query;

    if (priceLow && priceHigh) {
      baseQuery += ' AND price >= ? AND price <= ?';
      queryParams.push(priceLow, priceHigh);
      //   console.log(baseQuery);
    }

    //Pagination
    if (page) {
      const perPage = 12; // Number of items per page
      const startIndex = ((parseInt(page) || 1) - 1) * perPage;
      baseQuery += ' LIMIT ?, ?';
      queryParams.push(startIndex, perPage);
      console.log(baseQuery);
    }

    // Execute the query
    const [results] = await db.execute(baseQuery, queryParams);

    // Response
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({ message: '沒有找到相應的資訊' });
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.status(500).json({ error: '發生錯誤' });
  }
});

//整包product
// router.get("/", async (req, res) => {
//   try {
//     let [lesson] = await db.execute("SELECT * FROM `product` WHERE `type` = 2");

//     if (lesson) {
//       res.json(lesson);
//     } else {
//       res.json("沒有找到相應的資訊");
//     }
//   } catch (error) {
//     console.error("發生錯誤：", error);
//     res.json("發生錯誤");
//   }

//      const { priceLow, priceHigh } = req.query;
//      const query = `
//         SELECT * FROM product
//         WHERE price >= ? AND price <= ?
//         ORDER BY price ASC;
//     `;

//      db.query(query, [priceLow, priceHigh], (err, results) => {
//        if (err) throw err;
//        res.json(results);
//      });

// });

//lesson_category
router.get('/categories', async (req, res) => {
  try {
    let [lesson_category] = await db.execute(
      'SELECT * FROM `lesson_category` '
    );

    if (lesson_category) {
      res.json(lesson_category);
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

    let [lesson] = await db.execute(
      'SELECT * FROM `product` WHERE `lesson_category_id` = ?',
      [category]
    );

    if (lesson.length > 0) {
      res.json(lesson);
    } else {
      res.json('沒有找到相應的資訊');
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.json('發生錯誤');
  }
});

// 獲得單筆課程資料＋review
router.get('/:id', async (req, res, next) => {
  let luid = req.params.id;
  console.log(luid);
  let [data] = await db
    .execute(
      //       ”SELECT p.*, pr.*, lc.*
      // FROM `product` AS p
      // LEFT JOIN `product_review` AS pr ON p.id = pr.product_id
      // LEFT JOIN `lesson_category` AS lc ON p.lesson_category_id = lc.id
      // WHERE p.`puid` = ?“,
      //       [luid] //FIXME評論多連一張資料表

      'SELECT p.*, pr.* FROM `product` AS p LEFT JOIN `product_review` AS pr ON p.id = pr.product_id WHERE p.`puid` = ?',
      [luid]
    )
    .catch(() => {
      return undefined;
    });

  if (data) {
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(400).send('發生錯誤');
  }
});

// 獲得單筆課程資料＋review
router.get('/:id', async (req, res, next) => {
  let luid = req.params.id;
  console.log(luid);
  let [data] = await db
    .execute(
      'SELECT p.*, pr.* FROM `product` AS p LEFT JOIN `product_review` AS pr ON p.id = pr.product_id WHERE p.`puid` = ?',
      [luid]
    )
    .catch(() => {
      return undefined;
    });

  if (data) {
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(400).send('發生錯誤');
  }
});

router.get('/:priceLow&;priceHigh', async (req, res, next) => {
  const { priceLow, priceHigh } = req.query;
  const query = `
        SELECT * FROM product
        WHERE price >= ? AND price <= ?
        ORDER BY price ASC;
    `;

  db.query(query, [priceLow, priceHigh], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//   // 排序用
//   let orderDirection = req.query.order || "ASC";

export default router;
