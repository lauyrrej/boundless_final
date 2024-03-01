import express from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/:id', async (req,res, next) => {
    let id = req.params.id;
    console.log(id);
    let [jam] = await db.execute("SELECT * FROM `jam` WHERE `id` = ? ", [id]).catch(() => {
        return undefined;
    });
    console.log(jam);
    if(jam) {
        res.send(jam)
    } else {
        res.send("發生錯誤")
    }
});

export default router;