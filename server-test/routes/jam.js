import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// 取得所有組團資料
router.get("/", async (req, res, next) => {
  // 取得組團資訊中所需的曲風、樂手資料
  let [genreData] = await db.execute("SELECT * FROM `genre`").catch(() => {
    return undefined;
  });
  let [playerData] = await db.execute("SELECT * FROM `player`").catch(() => {
    return undefined;
  });

  // 取得目前時間，應對資料庫中儲存的資料，使用ISO格式
  const now = new Date().toISOString();

  // 取得資料總筆數，用於製作分頁
  let [dataCount] = await db
    .execute(
      "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND (`formed_time` IS NULL OR `formed_time` = '0000-00-00 00:00:00')",
      [now]
    )
    .catch(() => {
      return undefined;
    });

  let page = Number(req.query.page) || 1; // 目前頁碼
  let dataPerpage = 10; // 每頁 10 筆
  let offset = (page - 1) * dataPerpage; // 取得下一批資料
  let pageTotal = Math.ceil(dataCount.length / dataPerpage); // 計算總頁數
  let pageString = " LIMIT " + offset + "," + dataPerpage;

  // 排序用
  let orderDirection = req.query.order || "ASC";

  let data;
  if (Object.keys(req.query).length !== 0) {
    // 所有篩選條件
    let sqlString =
      "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > '" +
      now +
      "'";
    const degree =
      req.query.degree !== "all"
        ? " AND `degree` = " + parseInt(req.query.degree)
        : "";
    // genere 和 player 儲存的是字串，需使用 LIKE 語法，而非 FIND_IN_SET('1', `genere`)
    const genre =
      req.query.genre !== "all"
        ? " AND (`genre` LIKE '%," +
          req.query.genre +
          "]'" +
          " OR `genre` LIKE '[" +
          req.query.genre +
          ",%'" +
          " OR `genre` LIKE '%," +
          req.query.genre +
          ",%'" +
          " OR `genre` = '[" +
          req.query.genre +
          "]')"
        : "";
    const player =
      req.query.player !== "all"
        ? " AND (`player` LIKE '%," +
          req.query.player +
          "]'" +
          " OR `player` LIKE '[" +
          req.query.player +
          ",%'" +
          " OR `player` LIKE '%," +
          req.query.player +
          ",%'" +
          " OR `player` = '[" +
          req.query.player +
          "]')"
        : "";
    const region =
      req.query.region !== "all"
        ? " AND `region` = '" + req.query.region + "'"
        : "";

    sqlString +=
      degree +
      genre +
      player +
      region +
      " ORDER BY `created_time` " +
      orderDirection;
    [dataCount] = await db.execute(sqlString).catch(() => {
      return undefined;
    });
    console.log(sqlString);

    page = Number(req.query.page) || 1; // 目前頁碼
    dataPerpage = 10; // 每頁 10 筆
    offset = (page - 1) * dataPerpage; // 取得下一批資料
    pageTotal = Math.ceil(dataCount.length / dataPerpage); // 計算總頁數
    pageString = " LIMIT " + offset + "," + dataPerpage;

    sqlString += pageString;
    console.log(sqlString);
    [data] = await db.execute(sqlString).catch(() => {
      return undefined;
    });
    console.log(data);
  } else {
    // 沒有篩選條件
    [data] = await db
      .execute(
        "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND (`formed_time` IS NULL OR `formed_time` = '0000-00-00 00:00:00') ORDER BY `created_time` ASC LIMIT 0, 10",
        [now]
      )
      .catch(() => {
        return undefined;
      });
    console.log(data);
  }

  if (data && data != undefined) {
    // 整理資料，把字串轉成陣列或物件
    const jamData = data.map((v, i) => {
      // member可能為空值，先令其為空陣列
      let setMember = [];
      if (v.member) {
        setMember = JSON.parse(v.member);
      }
      return {
        ...v,
        former: JSON.parse(v.former),
        member: setMember,
        player: JSON.parse(v.player),
        genre: JSON.parse(v.genre),
      };
    });
    res.status(200).json({
      genreData: genreData,
      playerData: playerData,
      jamData: jamData,
      dataTotal: dataCount.length,
      pageTotal: pageTotal,
      page: page,
    });
  } else {
    res.status(400).send("發生錯誤");
  }
});

// 組團資訊頁，獲得單筆資料
router.get("/:id", async (req, res, next) => {
  // 取得組團資訊中所需的曲風、樂手資料
  let [genreData] = await db.execute("SELECT * FROM `genre`").catch(() => {
    return undefined;
  });
  let [playerData] = await db.execute("SELECT * FROM `player`").catch(() => {
    return undefined;
  });

  let id = req.params.id;
  // console.log(id);
  let [data] = await db
    .execute("SELECT * FROM `jam` WHERE `id` = ? ", [id])
    .catch(() => {
      return undefined;
    });

  if (data) {
    const trueData = data[0];
    let setMember = [];
    if (trueData.member) {
      setMember = JSON.parse(trueData.member);
    }
    const jamData = {
      ...trueData,
      member: setMember,
      former: JSON.parse(trueData.former),
      player: JSON.parse(trueData.player),
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