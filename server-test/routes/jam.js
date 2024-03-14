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

  // 取得資料總筆數，用於製作分頁，招募中state = 0
  let [dataCount] = await db
    .execute(
      "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND `state` = 0",
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
    // 所有篩選條件，預設條件: valid=1(未解散)、state=0(發起中)、時間未過期
    let sqlString =
      "SELECT * FROM `jam` WHERE `valid` = 1 AND `state` = 0 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > '" +
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
    // console.log(sqlString);

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
        "SELECT * FROM `jam` WHERE `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ? AND `state` = 0 ORDER BY `created_time` ASC LIMIT 0, 10",
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
      return [];
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
router.get("/singleJam/:juid/:uid", async (req, res) => {
  const juid = req.params.juid;
  // console.log(juid);
  // 檢查該樂團是否已經成團，條件: 未解散(valid=1)，已成團(state=1)
  const [checkFormed] = await db
    .execute(
      "SELECT * FROM `jam` WHERE `juid` = ? AND `valid` = 1 AND `state` = 1",
      [juid]
    )
    .catch(() => {
      return undefined;
    });
  if (checkFormed.length > 0) {
    console.log(checkFormed);
    res.status(200).json({ status: "formed" });
    return;
  }
  // 檢查訪問的使用者是否有申請此樂團，並獲得其狀態
  const uid = req.params.uid;
  console.log(uid);
  let myApplyState = [];
  if (uid) {
    [myApplyState] = await db
      .execute("SELECT `state` FROM `jam_apply` WHERE `applier_uid` = ?", [uid])
      .catch(() => {
        return undefined;
      });
  }
  // console.log(myApplyState);

  // -------------------------------------- 取得組團資訊中所需的曲風、樂手資料 --------------------------------------
  const [genreData] = await db.execute("SELECT * FROM `genre`").catch(() => {
    return undefined;
  });
  const [playerData] = await db.execute("SELECT * FROM `player`").catch(() => {
    return undefined;
  });

  // 取得目前時間，應對資料庫中儲存的資料，使用ISO格式
  const now = new Date().toISOString();

  const [data] = await db
    .execute(
      "SELECT * FROM `jam` WHERE `juid` = ? AND `valid` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) > ?",
      [juid, now]
    )
    .catch(() => {
      return undefined;
    });
  if (data && data.length > 0) {
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

    // -------------------------------------- 撈取該樂團的申請資料 --------------------------------------
    // valid=1 未取消
    let [applyData] = await db
      .execute("SELECT * FROM `jam_apply` WHERE `valid` = 1 AND `juid` = ?", [
        juid,
      ])
      .catch(() => {
        return [];
      });

    // -------------------------------------- 若存在申請資料，進行資料整理
    if (applyData.length > 0) {
      applyData = applyData.map((v) => {
        const createdDate = new Date(v.created_time)
          .toLocaleString()
          .split(" ")[0]
          .replace(/\//g, "-");
        return {
          ...v,
          created_time: createdDate,
        };
      });
      applyData = applyData.map((v) => {
        const matchPlay = playerData.find((pv) => {
          return pv.id === v.applier_play;
        }).name;
        return {
          ...v,
          play: matchPlay,
        };
      });
      // -------------------------------------- 合併對應的會員資料
      let appliersID = "";
      let appliersSql =
        "SELECT `id`, `uid`, `name`, `img`, `nickname` FROM `user` WHERE `uid` IN ";
      applyData.map((v, i) => {
        if (i < applyData.length - 1) {
          appliersID += "'" + v.applier_uid + "',";
        } else {
          appliersID += "'" + v.applier_uid + "'";
        }
      });
      appliersSql += `(${appliersID})`;
      // console.log(formerSql);
      const [appliers] = await db.execute(appliersSql).catch(() => {
        return undefined;
      });
      applyData = applyData.map((v) => {
        let matchUser = appliers.find((av) => {
          return av.uid === v.applier_uid;
        });
        return {
          ...v,
          applier: matchUser,
        };
      });
    }

    // -------------------------------------- 撈取對應的發起人&成員資料 --------------------------------------
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

    // -------------------------------------- 成員資料
    // 若有成員
    if (jamData.member.length > 0) {
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
      status: "success",
      genreData,
      playerData,
      jamData,
      applyData,
      myApplyState,
    });
  } else {
    res.status(400).json({ status: "error" });
  }
});

router.get("/getMyApply/:uid", async (req, res) => {
  const uid = req.params.uid;
  // console.log(uid);
  const [datas] = await db
    .execute(
      "SELECT * FROM `jam_apply` WHERE `valid` = 1 AND `applier_uid` = ? ",
      [uid]
    )
    .catch(() => {
      return undefined;
    });
  if (datas && datas.length > 0) {
    const now = new Date().toISOString();
    const [playerData] = await db
      .execute("SELECT * FROM `player`")
      .catch(() => {
        return undefined;
      });

    const data = datas.map((v) => {
      const match = playerData.find((pv) => {
        return pv.id === v.applier_play;
      }).name;
      return { ...v, applier_play: match };
    });

    // 過濾解散、已成團、發起失敗(過期)的jam
    let allJuid = "";
    let allJuidSql =
      "SELECT `juid` FROM `jam` WHERE `valid` = 0 AND `state` = 1 AND DATE_ADD(`created_time`, INTERVAL 30 DAY) < '" +
      now +
      "' AND `juid` IN ";
    data.forEach((v, i) => {
      if (i < data.length - 1) {
        allJuid += "'" + v.juid + "',";
      } else {
        allJuid += "'" + v.juid + "'";
      }
    });
    allJuidSql += `(${allJuid})`;
    // console.log(allJuidSql);
    const [jamExist] = await db.execute(allJuidSql).catch(() => {
      return undefined;
    });
    if (jamExist && jamExist.length > 0) {
      data = data.filter((v) => {
        return !jamExist.includes(v.juid);
      });
    }

    console.log(data);
    res.status(200).json({ status: "success", data });
  } else {
    res.status(400).json({ status: "error" });
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
  let updateUser = await db
    .execute("UPDATE `user` SET `my_jam` = ? WHERE `uid` = ?", [juid, uid])
    .then(() => {
      return 1;
    })
    .catch(() => {
      return 0;
    });
  if (updateUser === 0) {
    console.log("新增失敗");
    return;
  }
  // 刪除所有該會員的申請
  let updateApply = await db
    .execute("UPDATE `jam_apply` SET `valid` = 0 WHERE `applier_uid` = ?", [
      uid,
    ])
    .then(() => {
      return 1;
    })
    .catch(() => {
      return 0;
    });
  if (updateApply === 0) {
    console.log("刪除失敗");
    return;
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
      res.status(500).json({ status: "error", error });
    });
});

// 申請入團
router.post("/apply", upload.none(), async (req, res) => {
  // console.log(req.body);
  const { juid, former_uid, applier_uid, applier_play, message } = req.body;
  await db
    .execute(
      "INSERT INTO `jam_apply` (`id`, `juid`, `former_uid`, `applier_uid`,  `applier_play`, `message`) VALUES (NULL, ?, ?, ?, ?, ?)",
      [juid, former_uid, applier_uid, applier_play, message]
    )
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((error) => {
      res.status(500).json({ status: "error", error });
    });
});

// 取消申請
router.put("/cancelApply", upload.none(), async (req, res) => {
  const { id } = req.body;
  await db
    .execute("UPDATE `jam_apply` SET `state` = 3, `valid` = 0 WHERE `id` = ?", [
      id,
    ])
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((error) => {
      res.status(500).json({ status: "error", error });
    });
});

// 刪除申請
router.put("/deleteApply", upload.none(), async (req, res) => {
  const { id } = req.body;
  await db
    .execute("UPDATE `jam_apply` SET `state` = 4, `valid` = 0 WHERE `id` = ?", [
      id,
    ])
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((error) => {
      res.status(500).json({ status: "error", error });
    });
});

// 正式加入
router.put("/join", upload.none(), async (req, res) => {
  const { id } = req.body;
  await db
    .execute("UPDATE `jam_apply` SET `valid` = 0 WHERE `id` = ?", [id])
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch((error) => {
      res.status(500).json({ status: "error", error });
    });
});

// 拒絕or接受申請
router.put("/decideApply", upload.none(), async (req, res) => {
  // UPDATE `jam_apply` SET `valid` = 0 WHERE `applier_uid` = ?
  const { id, state } = req.body;
  console.log(id);
  // 檢查該申請是否已經取消
  const [checkCancel] = await db
    .execute("SELECT `id` FROM `jam_apply` WHERE `valid` = 0 AND `id` = ?", [
      id,
    ])
    .catch(() => {
      return undefined;
    });
  if (checkCancel && checkCancel.length > 0) {
    res.status(200).json({ status: "cancel" });
  } else {
    // 更新申請狀態
    await db
      .execute("UPDATE `jam_apply` SET `state` = ? WHERE `id` = ?", [state, id])
      .then(() => {
        res.status(200).json({ status: "success", state: parseInt(state) });
      })
      .catch((error) => {
        res.status(500).json({ status: "error", error });
      });
  }
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
