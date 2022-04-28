import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.njk');
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

router.get('/features', (req, res) => {
    res.render('features.njk');
});

router.get('/features/roadmap', (req, res) => {
    res.render('roadmap.njk');
});

router.get('/documentation', (req, res) => {
    res.render('documentation.njk');
});

router.get('/documentation/user-journeys', (req, res) => {
    res.render('documentation-user-journeys.njk');
});

router.get('/users-create-an-account-upfront-pdf', (req, res) => {
    res.sendFile(__dirname + "/files/users-create-an-account-upfront.pdf");
});

router.get('/users-create-an-account-to-save-progress-pdf', (req, res) => {
    res.sendFile(__dirname + "/files/users-create-an-account-to-save-progress.pdf");
});

router.get('/documentation/design-recommendations', (req, res) => {
    res.render('documentation-design-recommendations.njk');
});

export default router;
