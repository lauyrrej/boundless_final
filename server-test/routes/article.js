import express, { json } from "express";
import db from "../db.js";

const router = express.Router();

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
  console.log(auid);
  let [data] = await db
    .execute("SELECT * FROM `article` WHERE `id` = ? ", [auid])
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
