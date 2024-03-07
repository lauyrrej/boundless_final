import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

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

// 文章資訊頁，獲得單筆資料
router.get("/:auid", async (req, res) => {
  // 取得組團資訊中所需的曲風、樂手資料
  let [genreData] = await db.execute("SELECT * FROM `genre`").catch(() => {
    return undefined;
  });
  let [playerData] = await db.execute("SELECT * FROM `player`").catch(() => {
    return undefined;
  });

  let auid = req.params.auid;
  console.log(auid);
  // console.log(id);
  let [data] = await db
    .execute("SELECT * FROM `article` WHERE `auid` = ? ", [auid])
    .catch(() => {
      return undefined;
    });
  if (data) {
    const trueData = data[0];
    console.log(data);
    let setMember = [];
    if (trueData.member !== "[]" || trueData.member) {
      setMember = JSON.parse(trueData.member);
    }
    const jamData = {
      ...trueData,
      member: setMember,
      former: JSON.parse(trueData.former),
      player: JSON.parse(trueData.players),
      genre: JSON.parse(trueData.genre),
    };
    // console.log(jam);
    res.status(200).json({
      genreData: genreData,
      playerData: playerData,
      jamData: jamData,
    });
  } else {
    res.status(400).send("發生錯誤");
  }
});

export default router;
