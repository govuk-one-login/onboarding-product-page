import express from 'express';

const router = express.Router();

router.get('/decide', (req, res) => {
  res.redirect(301, '/getting-started');
});

router.get('/decide/timescales', (req, res) => {
  res.redirect(301, '/features/roadmap');
});

router.get('/decide/user-journeys', (req, res) => {
  res.redirect(301, '/documentation/user-journeys');
});

router.get('/decide/design-patterns', (req, res) => {
  res.redirect(301, '/documentation/design-recommendations');
});

router.get('/decide/private-beta', (req, res) => {
  res.redirect(301, '/getting-started/private-beta');
});

export default router;
