import express from 'express';
import { mailingList } from "../controllers/mailing-list";

const router = express.Router();

router.get('/mailing-list', (req, res) => {
  res.render('mailing-list.njk');
});
router.post('/mailing-list', mailingList);

export default router;
