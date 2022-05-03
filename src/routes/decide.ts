import express from 'express';
import {
    requestSubmitted,
    showRequestForm,
    submitRequestForm,
    error
} from "../controllers/decide";

const router = express.Router();

router.get('/private-beta/request-form', showRequestForm);
router.post('/private-beta/request-form', submitRequestForm);
router.get('/private-beta/request-submitted', requestSubmitted);
router.get('/private-beta/request-error', error);

export default router;
