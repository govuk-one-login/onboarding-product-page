import express from 'express';
import { mailingList } from "../controllers/mailing-list";

const router = express.Router();

router.get('/mailing-list', (req, res) => {
  res.render('mailing-list/mailing-list.njk');
});

router.get('/mailing-list/confirmation', (req, res) => {
  res.render('mailing-list/mailing-list-confirmation.njk');
});

router.post('/mailing-list', mailingList);

export default router;
