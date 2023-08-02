import {confirm, get, post, error, showRegisterToGetStartedForm, submitRegisterToGetStartedForm} from "../controllers/register";
import express from "express";

const router = express.Router();

router.get("/register", get);
router.post("/register", post);
router.get("/register-confirm", confirm);
router.get("/register-error", error);
router.get("/register-to-get-started", showRegisterToGetStartedForm);
router.post("/register-to-get-started", submitRegisterToGetStartedForm);

export default router;
