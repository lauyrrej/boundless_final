import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Mandatory type filter
    //評價篩選
    let baseQuery = `
      SELECT 
          product.*, 
          COUNT(product_review.product_id) AS review_count, 
          AVG(product_review.stars) AS average_rating, 
          teacher_info.name AS teacher_name,  
          teacher_info.img AS teacher_img,     
          teacher_info.info AS teacher_info  
      FROM 
          product
      LEFT JOIN 
          product_review ON product.id = product_review.product_id
      LEFT JOIN 
          teacher_info ON product.teacher_id = teacher_info.id 
      WHERE 
          product.type = ?`;

    //價格篩選
    let queryParams = [2];
    // Additional filters
    const { priceLow, priceHigh } = req.query;

    if (priceLow && priceHigh) {
      baseQuery += ' AND product.price >= ? AND product.price <= ?';
      queryParams.push(priceLow, priceHigh);
    }

    baseQuery += ' GROUP BY product.id ORDER BY product.id;';
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
    let query = 'SELECT * FROM `product` WHERE `type` = 2';
    let queryParams = [];

    // 如果 category 不是空字串或'0'，則增加類別過濾條件
    if (category !== '' && category !== '0') {
      query += ' AND `lesson_category_id` = ?';
      queryParams = [category];
    }

    let [lessons] = await db.execute(query, queryParams);

    if (lessons.length > 0) {
      res.json(lessons);
    } else {
      res.json({ message: '沒有找到相應的資訊' });
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.status(500).json({ error: '發生錯誤' });
  }
});

// 獲得單筆課程資料＋review
router.get('/:id', async (req, res, next) => {
  let luid = req.params.id;
  console.log(luid);
  try {
    let [data] = await db.execute(
      'SELECT p.*, pr.*,lc.name as lesson_category_name' +
        ' FROM `product` AS p ' +
        ' LEFT JOIN `product_review` AS pr ON p.id = pr.product_id ' +
        ' LEFT JOIN `lesson_category` AS lc ON p.lesson_category_id = lc.id ' +
        ' WHERE p.`puid` = ? AND p.`lesson_category_id` IN (' +
        '   SELECT `lesson_category_id` FROM `product` WHERE `puid` = ?' +
        ')',
      [luid, luid]
    );
    //FIXME sql可以改一下

    let [product_review] = await db.execute(
      `
      SELECT pr.*, u.*
      FROM product p
      JOIN product_review pr ON p.id = pr.product_id
      JOIN user AS u ON pr.user_id = u.id
      WHERE p.puid = ?
    `,
      [luid]
    );

    let [youwilllike] = await db.execute(
      'SELECT p.* FROM `product` AS p ' +
        'JOIN (SELECT `lesson_category_id` FROM `product` WHERE `puid` = ?) AS sub ' +
        'ON p.`lesson_category_id` = sub.`lesson_category_id`',
      [luid]
    );

    if ({ data, product_review, youwilllike }) {
      console.log({ data });
      res.status(200).json({ data, product_review, youwilllike });
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Internal server error');
  }
});
export default router;
