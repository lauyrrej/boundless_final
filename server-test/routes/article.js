import express, { json } from 'express';
import db from '../db.js';
import cors from 'cors';
// import formidable from "formidable";
//上傳檔案
import { renameSync } from "fs";
import { dirname, resolve, extname } from "path";
import { fileURLToPath } from "url";
//方法2
import formidable from "formidable";
const __dirname = dirname(fileURLToPath(import.meta.url));
import multer from 'multer';
const upload = multer();

const router = express.Router();
router.use(cors());

// 文章列表
router.get('/', async (req, res) => {
  try {
    let [articleData] = await db.execute(
      'SELECT article.*, article_category.name AS category_name,article_comment.likes AS comment_likes, user.name AS user_name, user.img AS user_img, article_user.name AS article_author_name, article_user.img AS article_author_img FROM article JOIN article_category ON article.category_id = article_category.id LEFT JOIN article_comment ON article.id = article_comment.article_id LEFT JOIN user ON article_comment.user_id = user.id LEFT JOIN user AS article_user ON article.user_id = article_user.id ORDER BY article.id'
    );
    if (articleData) {
      res.json(articleData);
    } else {
      res.json('沒有找到相應的資訊');
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    res.json('發生錯誤' + error);
  }
});

router.get('/:id', async (req, res, next) => {
  let auid = req.params.id;
  let [data] = await db
    .execute(
      'SELECT article.*, article_category.name AS category_name, article_comment.content AS comment_content,article_comment.created_time AS comment_created_time,article_comment.likes AS comment_likes, user.name AS user_name, user.img AS user_img FROM article JOIN article_category ON article.category_id = article_category.id LEFT JOIN article_comment ON article.id = article_comment.article_id LEFT JOIN user ON article_comment.user_id = user.id WHERE article.auid = ?',
      [auid]
    )
    .catch(() => {
      return undefined;
    });
  if (data) {
    res.status(200).json(data);
    console.log(data);
  } else {
    res.status(400).send('發生錯誤');
  }
});

// article_category
router.get('/:categories', async (req, res, next) => {
  let category_id = req.params.category_id;
  let [data] = await db
    .execute(
      'SELECT article.*, article_category.name AS category_name, article_comment.content AS comment_content,article_comment.created_time AS comment_created_time,article_comment.likes AS comment_likes, user.name AS user_name, user.img AS user_img FROM article JOIN article_category ON article.category_id = article_category.id LEFT JOIN article_comment ON article.id = article_comment.article_id LEFT JOIN user ON article_comment.user_id = user.id WHERE article.category_id = ?',
      [category_id]
    )
    .catch(() => {
      return undefined;
    });
  if (data) {
    res.status(200).json(data);
    console.log(data);
  } else {
    res.status(400).send('發生錯誤');
  }
});

// 照片上傳(抓不到image)
router.post('/api/upload', upload.single('myFile'), (req, res) => {
  // 處理上傳邏輯與命名myFile=前端input:name
  let timestamp = Date.now();
  let newFileName = timestamp + extname(req.file.originalname);
  // 根據時間點給予新的名稱
  renameSync(req.file.path, resolve(__dirname, 'public/article', newFileName));
  res.json({ body: req.body, file: req.file });
});

// 文章發布(fetch error)
router.post(
  '/article-list/article-publish',
  upload.none(''),
  async (req, res) => {
    const { title, content, category_id } = req.body;
    console.log(req.body)
    const auid = generateUid();
    await db
      .execute(
        'INSERT INTO `article` (`id`,`auid`, `title`, `content`, `category_id` ) VALUES (NULL, ?, ?, ?, ?)',
        [auid, title, content, category_id]
      )
      .then(() => {
        res.status(200).json({ status: 'success', auid });
      })
      .catch((error) => {
        res.status(409).json({ status: 'error', error });
      });
  }
);

function generateUid() {
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codeLength = 12;
  let createdCodes = [];
  let createCodes = '';

  let Code = '';
  do {
    Code = '';
    for (let i = 0; i < codeLength; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      //   回傳characters當中的隨機一值
      Code += characters.charAt(randomIndex);
    }
  } while (createdCodes.includes(Code));

  createdCodes.push(Code);
  createCodes += Code;
  return createCodes;
}

export default router;
