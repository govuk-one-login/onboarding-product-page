import {confirm, get, post, error} from '../controllers/register';
import express from 'express';

const router = express.Router();

router.get('/register', get);
router.post('/register', post);
router.get('/register-confirm', confirm);
router.get('/register-error', error);

export default router;