import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.njk');
});

router.get('/identity-checks', (req, res) => {
    res.render('identity-checks.njk');
});

router.get('/find-out-more', (req, res) => {
    res.render('find-out-more.njk');
});

router.get('/getting-started', (req, res) => {
    res.render('getting-started.njk');
});

router.get('/accessibility', (req, res) => {
    res.render('accessibility.njk');
});

router.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy.njk');
});

router.get('/cookies', (req, res) => {
    res.render('cookies.njk');
});

router.get('/decide', (req, res) => {
    res.render('decide.njk');
});

router.get('/contact-us-details', (req, res) => {
    res.render('contact-us-details.njk');
});


export default router;