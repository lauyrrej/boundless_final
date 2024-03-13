import express, { json } from "express";
import db from "../db.js";
import multer from "multer";
import moment from "moment";

//上傳檔案
import {renameSync} from "fs";
import {dirname, resolve, extname} from "path";
import {fileURLToPath} from "url";
//方法2
import formidable from "formidable";
const __dirname = dirname(fileURLToPath(import.meta.url));



// const testdirname = `/`;
// console.log(__dirname)
// console.log(testdirname)

//token相關
import jwt from "jsonwebtoken";
import "dotenv/config.js";

// 從環境檔抓取secretKey(token加密用)
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const router = express.Router();
const upload = multer();

//得到所有會員資料
// let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");
// console.log(userData)


//上傳檔案-----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    if(!req.timestamp){
      req.timestamp = Date.now();
      req.index = 0;
    }else{
      req.index++;
    }
    let newName = (req.timestamp + req.index) + extname(file.originalname);
    cb(null, newName)
  }
})
const uploadTest = multer({ storage: storage })
// const uploadTest = multer({ dest: resolve(__dirname, "public")})



router.post("/upload1", uploadTest.single('myFile'), (req, res)=>{
  // res.json({body: req.body, file: req.file});
  // render("你好")
  // res.send("處理檔案上傳");

  // let timestamp = Date.now();
  // // let newName = timestamp + extname(req.file.originalname);
  // let newName = timestamp ;

  // // renameSync(req.file.path, resolve(__dirname, "public/"));
  // req.body.myFile = newName;
  res.json({body: req.body, file: req.file});
});

router.post("/upload2", (req, res)=>{
  const form = formidable({
    uploadDir: resolve(__dirname, "public/"),
    keepExtensions: true,
    multiples: true})

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });

  res.json({body: req.body, file: req.file});
});
//上傳檔案-----------------------

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
router.post("/login", upload.none(), async(req, res) => {
  let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");
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
        img: user.img,
        my_jam: user.my_jam,
      },
      accessTokenSecret,
      //token 認證的時長原為30m
      { expiresIn: "3d" }
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

router.post("/logout", checkToken, async(req, res) => {
  // console.log(req.decoded)
  let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");
  const user = userData.find((u) => u.email === req.decoded.email);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        img: user.img,
        my_jam: user.my_jam,
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

router.post("/status", checkToken, async(req, res) => {
  let [userData] = await db.execute("SELECT * FROM `user` WHERE `valid` = 1");
  const user = userData.find((u) => u.email === req.decoded.email);
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        mail: user.mail,
        img: user.img,
        my_jam: user.my_jam,
      },
      accessTokenSecret,
      { expiresIn: "3d" }
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
    `SELECT \`id\` ,\`name\` ,\`email\`,\`phone\`,\`postcode\`,\`country\`,\`township\`,\`address\`,\`birthday\`,\`genre_like\`,\`play_instrument\`,\`info\`,\`img\`,\`gender\`,\`nickname\`,\`google_uid\`,\`photo_url\`,\`privacy\`,\`my_lesson\` ,\`my_jam\` FROM \`user\` WHERE \`id\` = ? AND \`valid\` = 1`,
    [id]
  );

  const resUser = singerUser[0];

  return res.json(resUser);
  //改檔老師寫法
  // return res.json({ status: 'success', data: { resUser } })
});

// GET - 得到單筆會員資料資料 全部資料版本含密碼
router.get("/profile/:id", checkToken, async function (req, res) {
  const id = req.params.id;

  
  //所有資料
  const [singerUser] =  await db.execute(`SELECT * FROM \`user\` WHERE \`id\` = ? AND \`valid\` = 1`, [id]);
 
  const resUser = singerUser[0];
  return res.json(resUser);
  //改檔老師寫法
  // return res.json({ status: 'success', data: { resUser } })
});

//會員更新資訊
router.post("/editProfile/:id", checkToken, async function (req, res) {
  const id = req.params.id;
  let { email, name , password, phone, postcode, country, township, address, birthday, genre_like , play_instrument , info, gender , nickname , privacy } = req.body;
  // console.log(req.body)
  console.log(email)
  console.log(name)
  console.log(birthday)
  // birthday = new Date(birthday)
  // if(birthday.length > 10){
  //   birthday = birthday.split('T')[0]
  //   console.log(birthday)
  // }
  // console.log(birthday)


  // 更新資料庫
  const [result] = await db.execute(`UPDATE user SET email = ?, name =? , phone = ?, postcode = ? , country = ? , township = ?, address = ? , birthday = STR_TO_DATE(?, '%Y-%m-%d') , genre_like = ? , play_instrument = ?, info = ?, gender = ?, nickname = ?, privacy = ? WHERE id = ?;`, [email, name , phone, postcode, country, township, address, birthday, genre_like , play_instrument , info, gender , nickname , privacy, id]);

  
  // const resUser = singerUser[0];
  // return res.json(resUser);
  //改檔老師寫法
  return res.json({ status: 'success', data: { result } })
});

// 註冊 = 檢查資料庫是否有此email及密碼 ,如果沒有 就增加sql
router.post('/', async (req, res) => {
  const uuid = generateUid()
  // req.body資料範例
  // {
  //     "name":"金妮",
  //     "email":"ginny@test.com",
  //     "username":"ginny",
  //     "password":"12345"
  // }

  // 給予註冊當下時間 台北時區
  const currentTime = new Date();
  const taipeiTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000);
  const YYYYMMDDTime = taipeiTime.toISOString().slice(0, 19).replace("T", " "); // 將時間轉換為 'YYYY-MM-DD HH:mm:ss' 格式

  // 要新增的會員資料
  const newUser = req.body;

  // 檢查從前端來的資料哪些為必要(name, username...)
  if (!newUser.email || !newUser.password || !newUser.passwordCheck) {
    return res.json({ status: "error", message: "缺少必要資料" });
  }

  // 密碼請由英數8~20位組成  --先註解方便測試
  // if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(newUser.password)) {
  //   return res.json({ status: 'error', message: '密碼請由英數8~20位組成' });
  // }

  // return res.json({ status: 'success 2', message: '成功' })

  // 先查詢是否已存在該用戶
  const [users] = await db.execute("SELECT * FROM user WHERE email = ?;", [
    newUser.email,
  ]);
  if (users.length > 0) {
    // 用戶已存在
    return res.json({ status: "error 2", message: "該帳號已存在" });
  } else {
    // 用戶不存在，插入新用戶
    const [result] = await db.execute('INSERT INTO user (email, uid, password, created_time , valid) VALUES (?, ?, ?, ?, 1);', [newUser.email, uuid,newUser.password, YYYYMMDDTime]);
    // console.log('User inserted:', result);
  }

  // 成功建立會員的回應
  // 狀態`201`是建立資料的標準回應，
  // 如有必要可以加上`Location`會員建立的uri在回應標頭中，或是回應剛建立的資料
  // res.location(`/users/${user.id}`)
  return res.status(201).json({
    status: "success",
    data: null,
  });
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
//uid
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
