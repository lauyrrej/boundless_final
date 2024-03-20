import express, { json } from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/form', upload.none(), async (req, res) => {
    const {
        username,
        phone,
        email,
        country,
        township,
        postcode,
        address,
        totaldiscount,
        payment,
        transportation_state,
        cartdata,
    } = req.body;

    const newCartData = JSON.parse(cartdata)

    console.log(newCartData);



    // await db
    // .execute(
    //   'INSERT INTO `order_total` (`id`, `user_id`, `payment`, `transportation_state`, `phone`, `discount`, `postcode`, `country`, `township`, `address`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //   [
    //     username,
    //     payment,
    //     transportation_state,
    //     phone,
    //     totaldiscount,
    //     postcode,
    //     township,
    //     country,
    //     address,
    //   ]
    // )
    // .then(() => {
    //   res.status(200).json({ status: 'success', juid });
    // })
    // .catch((error) => {
    //   res.status(500).json({ status: 'error', error });
    // });

//     const {
//       uid,
//       title,
//       degree,
//       genre,
//       former,
//       players,
//       region,
//       condition,
//       description,
//     } = req.body;
//     const tureDegree = parseInt(degree);
//     const juid = generateUid();
//     // 更新會員所屬的JAM
//     let updateUser = await db
//       .execute('UPDATE `user` SET `my_jam` = ? WHERE `uid` = ?', [juid, uid])
//       .then(() => {
//         return 1;
//       })
//       .catch(() => {
//         return 0;
//       });
//     if (updateUser === 0) {
//       console.log('新增失敗');
//       return;
//     }
//     // 刪除所有該會員的申請
//     let updateApply = await db
//       .execute('UPDATE `jam_apply` SET `valid` = 0 WHERE `applier_uid` = ?', [
//         uid,
//       ])
//       .then(() => {
//         return 1;
//       })
//       .catch(() => {
//         return 0;
//       });
//     if (updateApply === 0) {
//       console.log('刪除失敗');
//       return;
//     }
  
//     await db
//       .execute(
//         'INSERT INTO `jam` (`id`, `juid`, `title`, `degree`, `genre`, `former`, `players`, `region`, `band_condition`, `description`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//         [
//           juid,
//           title,
//           tureDegree,
//           genre,
//           former,
//           players,
//           region,
//           condition,
//           description,
//         ]
//       )
//       .then(() => {
//         res.status(200).json({ status: 'success', juid });
//       })
//       .catch((error) => {
//         res.status(500).json({ status: 'error', error });
//       });
res.send('qq')
});

export default router;
