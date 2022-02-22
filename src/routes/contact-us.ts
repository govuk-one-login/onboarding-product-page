import express from 'express';
import {
    confirmation,
    showForm, submitForm
} from "../controllers/contact-us";

const router = express.Router();

router.get('/contact-us', showForm);
router.post('/contact-us', submitForm);
router.get('/contact-us-submitted', confirmation);

export default router;