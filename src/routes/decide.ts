import express from 'express';
import {
    designPatterns, decide,
    privateBeta,
    requestSubmitted,
    showRequestForm,
    submitRequestForm,
    timescales,
    userJourneys,
    error
} from "../controllers/decide";

const router = express.Router();

router.get('/', decide);
router.get('/timescales', timescales);
router.get('/private-beta', privateBeta);
router.get('/user-journeys', userJourneys);
router.get('/design-patterns', designPatterns);
router.get('/private-beta/request-form', showRequestForm);
router.post('/private-beta/request-form', submitRequestForm);
router.get('/private-beta/request-submitted', requestSubmitted);
router.get('/private-beta/request-error', error);

export default router;