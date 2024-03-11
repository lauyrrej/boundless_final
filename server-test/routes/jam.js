import express, { json } from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

// 取得所有組團資料
router.get("/allJam", async (req, res) => {
  // 取得組團資訊中所需的曲風、樂手資料
  let [genreData] = await db.execute("SELECT * FROM `genre`").catch((error) => {
    console.log(error);
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
    .catch((error) => {
      console.log(error);
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
      "SELECT * FROM `jam` WHERE `valid` = 1 AND (`formed_time` IS NULL OR `formed_time` = '0000-00-00 00:00:00') AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > '" +
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
        ? " AND (`players` LIKE '%," +
<<<<<<< HEAD
        req.query.player +
        "]'" +
        " OR `players` LIKE '[" +
        req.query.player +
        ",%'" +
        " OR `players` LIKE '%," +
        req.query.player +
        ",%'" +
        " OR `players` = '[" +
        req.query.player +
        "]')"
=======
          req.query.player +
          "]'" +
          " OR `players` LIKE '[" +
          req.query.player +
          ",%'" +
          " OR `players` LIKE '%," +
          req.query.player +
          ",%'" +
          " OR `players` = '[" +
          req.query.player +
          "]')"
>>>>>>> f199fd212cc0110d2a8f6e9075bb1cbf16c913ce
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
    // console.log(sqlString);
    [data] = await db.execute(sqlString).catch(() => {
      return undefined;
    });
    // console.log(data);
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
    // console.log(data);
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
        player: JSON.parse(v.players),
        genre: JSON.parse(v.genre),
      };
    });

    // 搜尋對應的發起人資料
    let formerSql =
      "SELECT `id`, `uid`, `name`, `img`, `nickname` FROM `user` WHERE `id` IN ";
    let formerID = "";
    jamData.forEach((v, i) => {
      if (i < jamData.length - 1) {
        formerID += v.former.id + ",";
      } else {
        formerID += v.former.id;
      }
    });
    formerSql += `(${formerID})`;
    // console.log(formerSql);
    let [formerData] = await db.execute(formerSql).catch(() => {
      return undefined;
    });
    // console.log(formerData);

    res.status(200).json({
      genreData,
      playerData,
      jamData,
      formerData,
      dataTotal: dataCount.length,
      pageTotal,
      page,
    });
  } else {
    res.status(400).send("發生錯誤");
  }
});

// 組團資訊頁，獲得單筆資料
router.get("/singleJam/:juid", async (req, res) => {
  // 取得組團資訊中所需的曲風、樂手資料
  const [genreData] = await db.execute("SELECT * FROM `genre`").catch(() => {
    return undefined;
  });
  const [playerData] = await db.execute("SELECT * FROM `player`").catch(() => {
    return undefined;
  });

  const juid = req.params.juid;
  // console.log(juid);
  const [data] = await db
    .execute("SELECT * FROM `jam` WHERE `juid` = ? ", [juid])
    .catch(() => {
      return undefined;
    });
  if (data) {
    const trueData = data[0];
    // console.log(data);
    let setMember = [];
    if (trueData.member !== "[]" || trueData.member) {
      setMember = JSON.parse(trueData.member);
    }
    let jamData = {
      ...trueData,
      member: setMember,
      former: JSON.parse(trueData.former),
      player: JSON.parse(trueData.players),
      genre: JSON.parse(trueData.genre),
    };

    // 撈取對應的發起人&成員資料
    const formerID = jamData.former.id;
    const [formerData] = await db
      .execute(
        "SELECT `id`, `uid`, `name`, `img`, `nickname` FROM `user` WHERE `id` = ? ",
        [formerID]
      )
      .catch(() => {
        return undefined;
      });
    // ------------------------------------------ 合併資料
    // former {id, play}
    // play對應樂器
    jamData.former.play = playerData.find((v) => {
      return v.id === jamData.former.play;
    }).name;
    // id對應會員資料
    jamData.former = {
      ...jamData.former,
      uid: formerData[0].uid,
      name: formerData[0].name,
      img: formerData[0].img,
      nickname: formerData[0].nickname,
    };
    // console.log(formerData);

    if (jamData.member[0]) {
      let membersID = "";
      let memberSql =
        "SELECT `id`, `uid`, `name`, `img`, `nickname` FROM `user` WHERE `id` IN ";
      jamData.member.forEach((v, i) => {
        if (i < jamData.member.length - 1) {
          membersID += v.id + ",";
        } else {
          membersID += v.id;
        }
      });
      memberSql += `(${membersID})`;
      // console.log(formerSql);
      const [memberData] = await db.execute(memberSql).catch(() => {
        return undefined;
      });
      // ------------------------------------------ 合併資料
      // play對應樂器
      jamData.member = jamData.member.map((v) => {
        const match = playerData.find((pv) => {
          return pv.id === v.play;
        });
        return { ...v, play: match.name };
      });
      // id對應會員資料
      jamData.member = jamData.member.map((v) => {
        const match = memberData.find((mv) => {
          return mv.id === v.id;
        });
        return {
          ...v,
          uid: match.uid,
          name: match.name,
          img: match.img,
          nickname: match.nickname,
        };
      });
    }

    res.status(200).json({
      genreData,
      playerData,
      jamData,
    });
  } else {
    res.status(400).json({ status: "error", message: "無指定資料" });
  }
});

// 發起JAM表單
router.post("/form", upload.none(), async (req, res) => {
  // console.log(req.body);
  const {
    uid,
    title,
    degree,
    genre,
    former,
    players,
    region,
    condition,
    description,
  } = req.body;
  const tureDegree = parseInt(degree);
  const juid = generateUid();
  // 更新會員所屬的JAM
  let returnNum = await db
    .execute(
      "UPDATE `user` SET `my_jam` = ? WHERE `uid` = ?;",
      [juid, uid]
    )
    .then(() => {
      return 1;
    })
    .catch(() => {
      return 0;
    });
  if(returnNum === 0) {
    console.log("新增失敗");
    return
  }
  await db
    .execute(
      "INSERT INTO `jam` (`id`, `juid`, `title`, `degree`, `genre`, `former`, `players`, `region`, `band_condition`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        juid,
        title,
        tureDegree,
        genre,
        former,
        players,
        region,
        condition,
        description,
      ]
    )
    .then(() => {
      res.status(200).json({ status: "success", juid });
    })
    .catch((error) => {
      res.status(409).json({ status: "error", error });
    });
});

// 發起JAM表單
router.post("/apply", upload.none(), async (req, res) => {
  // console.log(req.body);
  const {
    title,
    degree,
    genre,
    former,
    players,
    region,
    condition,
    description,
  } = req.body;
  const tureDegree = parseInt(degree);
  const juid = generateUid();
  await db
    .execute(
      "INSERT INTO `jam` (`id`, `juid`, `title`, `degree`, `genre`, `former`, `players`, `region`, `band_condition`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        juid,
        title,
        tureDegree,
        genre,
        former,
        players,
        region,
        condition,
        description,
      ]
    )
    .then(() => {
      res.status(200).json({ status: "success", juid });
    })
    .catch((error) => {
      res.status(409).json({ status: "error", error });
    });
});

function generateUid() {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codeLength = 12;
  let createdCodes = [];
  let createCodes = "";

  let Code = "";
  do {
    Code = "";
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