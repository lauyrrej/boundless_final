import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Mandatory type filter
    //評價篩選
    const baseQuery = `
  SELECT product.*, COUNT(product_review.product_id) AS review_count, AVG(product_review.stars) AS average_rating
  FROM product
  LEFT JOIN product_review ON product.id = product_review.product_id
  WHERE product.type = 2
  GROUP BY product.id
  ORDER BY product.id
`;
    //價格篩選
    let queryParams = [2];
    // Additional filters
    const { priceLow, priceHigh, page } = req.query;

    if (priceLow && priceHigh) {
      baseQuery += ' AND price >= ? AND price <= ?';
      queryParams.push(priceLow, priceHigh);
      console.log(baseQuery);
    }

    // //Pagination
    // if (page) {
    //   const perPage = 12; // Number of items per page
    //   const startIndex = ((parseInt(page) || 1) - 1) * perPage;
    //   baseQuery += " LIMIT ?, ?";
    //     queryParams.push(startIndex, perPage);
    //      console.log(baseQuery);
    // }

    // Execute the query
    const [results] = await db.execute(baseQuery, queryParams);

    // Response
    if (results.length > 0) {
      res.json(results);
      console.log(results);
    } else {
      res.json({ message: '沒有找到相應的資訊' });
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.status(500).json({ error: '發生錯誤' });
  }
});

//lesson_category
router.get('/categories', async (req, res) => {
  try {
    let [lesson_category] = await db.execute(
      'SELECT * FROM `lesson_category` '
    );

    if (lesson_category) {
      res.json(lesson_category);
      console.log(lesson_category);
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
  try {
    let [data] = await db.execute(
      'SELECT p.*, pr.*, lc.* ' +
        'FROM `product` AS p ' +
        'LEFT JOIN `product_review` AS pr ON p.id = pr.product_id ' +
        'LEFT JOIN `lesson_category` AS lc ON p.lesson_category_id = lc.id ' +
        'WHERE p.`puid` = ? AND p.`lesson_category_id` IN (' +
        'SELECT `lesson_category_id` FROM `product` WHERE `puid` = ?' +
        ')',
      [luid, luid]
    ); //FIXME sql可以改一下

    let [youwilllike] = await db.execute(
      'SELECT p.* FROM `product` AS p ' +
        'JOIN (SELECT `lesson_category_id` FROM `product` WHERE `puid` = ?) AS sub ' +
        'ON p.`lesson_category_id` = sub.`lesson_category_id`',
      [luid]
    );

    if ({ data, youwilllike }) {
      console.log({ data, youwilllike });
      res.status(200).json({ data, youwilllike });
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
