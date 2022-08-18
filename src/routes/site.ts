import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.njk');
});

router.get('/getting-started', (req, res) => {
    res.render('getting-started/getting-started.njk');
});

router.get('/getting-started/private-beta', (req, res) => {
    res.render('getting-started/private-beta.njk');
});

router.get('/accessibility', (req, res) => {
    res.render('site/accessibility.njk');
});

router.get('/privacy-policy', (req, res) => {
    res.render('site/privacy-policy.njk');
});

router.get('/cookies', (req, res) => {
    res.render('site/cookies.njk');
});

router.get('/contact-us-details', (req, res) => {
    res.render('support/contact-us-details.njk');
});

router.get('/features', (req, res) => {
    res.render('features/features.njk');
});

router.get('/features/roadmap', (req, res) => {
    res.render('features/roadmap.njk');
});

router.get('/documentation', (req, res) => {
    res.render('documentation/documentation.njk');
});

router.get('/documentation/user-journeys', (req, res) => {
    res.render('documentation/user-journeys.njk');
});

router.get('/documentation/design-recommendations', (req, res) => {
    res.render('documentation/design-recommendations.njk');
});

router.get('/users-create-an-account-upfront-pdf-july-2022', (req, res) => {
    res.sendFile(__dirname + "/files/Option1-Users-create-an-account-upfront-July-2022.pdf");
});

router.get('/users-create-an-account-to-save-progress-pdf', (req, res) => {
    res.sendFile(__dirname + "/files/users-create-an-account-to-save-progress.pdf");
});

export default router;
