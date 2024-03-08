import express, { json } from "express";
import db from "../db.js";
import multer from "multer";
import moment from "moment";

//token相關
import jwt from "jsonwebtoken";
import "dotenv/config.js";

// 從環境檔抓取secretKey(token加密用)
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const router = express.Router();
const upload = multer();
//得到所有會員資料
let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");
// console.log(userData)

//GET 測試 - 得到所有會員資料
router.get("/", async (req, res, next) => {
  try {
    let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");

    if (userData) {
      res.json(userData);
      console.log(userData);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

//登入 目前設定 email 就是帳號 不可更改
router.post("/login", upload.none(), (req, res) => {
  const { email, password } = req.body;
  const user = userData.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      {
        // account: user.account, 沒用到帳號先註解測試
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      accessTokenSecret,
      //token 認證的時長原為30m
      { expiresIn: "120m" }
    );
    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "使用者帳號或密碼錯誤。",
    });
  }
});

router.post("/logout", checkToken, (req, res) => {
  // console.log(req.decoded)
  const user = userData.find((u) => u.email === req.decoded.email);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      accessTokenSecret,
      { expiresIn: "-10s" }
    );
    res.status(200).json({
      status: "logout success",
      token,
    });
  } else {
    res.status(401).json({
      status: "error",
      message: "登出失敗，請稍後重整頁面再試。",
    });
  }
});

router.post("/status", checkToken, (req, res) => {
  const user = userData.find((u) => u.email === req.decoded.email);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        mail: user.mail,
        head: user.head,
      },
      accessTokenSecret,
      { expiresIn: "30m" }
    );
    res.json({
      status: "token ok",
      token,
    });
  } else {
    res.status(401).json({
      status: "error",
      message: "請登入",
    });
  }
});

// GET - 得到單筆會員資料資料(注意，有動態參數時要寫在GET區段最後面)
router.get("/:id", checkToken, async function (req, res) {
  const id = req.params.id;
  //沒用 後端抓不到localStorage
  // const token = localStorage.getItem(appKey)
  // userData = jwtDecode(token)
  // const id = userData.id

  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  // if (req.user.id !== id) {
  //   return res.json({ status: 'error', message: '存取會員資料失敗' })
  // }

  //所有資料
  // const [singerUser] =  await db.execute(`SELECT * FROM \`user\` WHERE \`id\` = ? AND \`valid\` = 1`, [id]);

  // 不回傳密碼跟創建時間的版本
  const [singerUser] = await db.execute(
    `SELECT \`id\` ,\`name\` ,\`email\`,\`phone\`,\`postcode\`,\`country\`,\`township\`,\`address\`,\`birthday\`,\`genre_like\`,\`play_instrument\`,\`info\`,\`img\`,\`gender\`,\`nickname\`,\`google_uid\`,\`photo_url\`,\`privacy\`,\`my_lesson\` FROM \`user\` WHERE \`id\` = ? AND \`valid\` = 1`,
    [id]
  );

  const resUser = singerUser[0];

  return res.json(resUser);
});

//檢查token 當作中介使用
function checkToken(req, res, next) {
  let token = req.get("Authorization");

  if (token && token.indexOf("Bearer ") === 0) {
    token = token.slice(7);
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "error", message: "登入驗證失效，請重新登入。" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "無登入驗證資料，請重新登入。" });
  }
}

export default router;