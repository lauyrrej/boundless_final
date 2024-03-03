import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// 取得所有組團資料
router.get("/", async (req, res, next) => {
  // 取得目前時間，應對資料庫中儲存的資料，使用ISO格式
  const now = new Date().toISOString();

  let data;
  if (Object.keys(req.query).length !== 0) {
    // 有篩選條件
    let sqlString =
      "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > '" +
      now +
      "'";
    const degree =
      req.query.degree !== "all"
        ? " AND `degree` = " + parseInt(req.query.degree)
        : "";
    // genere 和 player 儲存的是字串，需使用 LIKE 語法，而非 FIND_IN_SET('1', `genere`)
    const genere =
      req.query.genere !== "all"
        ? " AND (`genere` LIKE '%," +
          req.query.genere +
          "]'" +
          " OR `genere` LIKE '[" +
          req.query.genere +
          ",%'" +
          " OR `genere` LIKE '%," +
          req.query.genere +
          ",%'" +
          " OR `genere` = '[" +
          req.query.genere +
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
    sqlString += degree + genere + player + region;
    console.log(sqlString);
    [data] = await db.execute(sqlString).catch(() => {
      return undefined;
    });
    console.log(data);
  } else {
    // 沒有篩選條件
    [data] = await db
      .execute(
        "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND (`formed_time` IS NULL OR `formed_time` = '0000-00-00 00:00:00')",
        [now]
      )
      .catch(() => {
        return undefined;
      });
    console.log(data);
  }

  if (data && data != undefined) {
    // 整理資料，把字串轉成陣列或物件
    const jam = data.map((v, i) => {
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
        genere: JSON.parse(v.genere),
      };
    });
    res.send(jam);
  } else {
    res.send("發生錯誤");
  }
});

router.get("/:id", async (req, res, next) => {
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
    const jam = {
      ...trueData,
      member: setMember,
      former: JSON.parse(trueData.former),
      player: JSON.parse(trueData.player),
      genere: JSON.parse(trueData.genere),
    };
    // console.log(jam);
    res.send(jam);
  } else {
    res.send("發生錯誤");
  }
});

export default router;
