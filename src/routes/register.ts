import {confirm, get, post} from '../controllers/register';
import express from 'express';

const router = express.Router();

router.get('/register', get);
router.post('/register', post);
router.get('/register-confirm', confirm);

export default router;