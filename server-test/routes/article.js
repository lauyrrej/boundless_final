import express, { json } from "express";
import db from "../db.js";
import cors from "cors";
import formidable from "formidable";
import { dirname, resolve, extname } from "path";
import { fileURLToPath } from "url";
import { renameSync } from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
import multer from "multer";
const upload = multer({ dest: resolve(__dirname, "public/Images") });
// 上傳內容放public

const router = express.Router();
router.use(cors());

// 文章列表
router.get("/", async (req, res) => {
  try {
    let [articleData] = await db.execute("SELECT * FROM `article`");
    // console.log(article)
    if (articleData) {
      res.json(articleData);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤" + error);
  }
});

// 獲得單篇文章資料
router.get("/:id", async (req, res, next) => {
  let auid = req.params.id;
  let [data] = await db
    .execute("SELECT * FROM `article` WHERE `auid` = ? ", [auid])
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

// article_category
router.get("/categories", async (req, res) => {
  try {
    let [articleCategory] = await db.execute("SELECT * FROM `article_category`");
    if (articleCategory) {
      res.json(articleCategory);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤" + error);
  }
});

router.post("/api/upload", upload.single("myFile"), (req, res) => {
  // 處理上傳邏輯與命名myFile=前端input:name
  let timestamp = Date.now();
  let newFileName = timestamp + extname(req.file.originalname);
  // 根據時間點給予新的名稱
  renameSync(req.file.path, resolve(__dirname, "public/upload", newFileName));
  res.json({ body: req.body, file: req.file });
  // bug 上傳bug
});

//特定分類的資料
// router.get("/category/:category", async (req, res) => {
//   try {
//     const category = req.params.category;

//     let [article] = await db.execute(
//       "SELECT * FROM `product` WHERE `article_category_id` = ?",
//       [category]
//     );
//     if (article.length > 0) {
//       res.json(article);
//     } else {
//       res.json("沒有找到相應的資訊");
//     }
//   } catch (error) {
//     console.error("發生錯誤：", error);
//     res.json("發生錯誤");
//   }
// });

export default router;