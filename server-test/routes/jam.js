import express from 'express';
import db from '../db.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/', (req,res, next) => {
    res.send('test');
});

export default router;