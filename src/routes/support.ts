import express from 'express';
import {
    showForm, submitForm
} from "../controllers/support";

const router = express.Router();

router.get('/support', showForm);
router.post('/support', submitForm);

export default router;