import express from "express";
import path from "path";
import {resources} from "../config/resources";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.njk");
});

router.get("/getting-started", (req, res) => {
    res.render("getting-started.njk");
});

router.get("/accessibility", (req, res) => {
    res.render("accessibility.njk");
});

router.get("/privacy-policy", (req, res) => {
    res.render("privacy-policy.njk");
});

router.get("/cookies", (req, res) => {
    res.render("cookies.njk");
});

router.get("/contact-us-details", (req, res) => {
    res.render("contact-us-details.njk");
});

router.get("/about/roadmap", (req, res) => {
    res.render("roadmap.njk");
});

router.get("/documentation", (req, res) => {
    res.render("documentation.njk");
});

router.get("/documentation/user-journeys", (req, res) => {
    res.render("documentation-user-journeys.njk");
});

router.get("/users-create-an-account-upfront-pdf-february-2023", (req, res) => {
    res.sendFile(
        path.join(resources, "journeys/GOVUK_One_Login_user_journeys_Option_1_Users_create_a_GOVUK_One_Login_upfront_02_2023.pdf")
    );
});

router.get("/users-create-an-account-to-save-progress-pdf-february-2023", (req, res) => {
    res.sendFile(
        path.join(resources, "journeys/GOVUK_One_Login_user_journeys_Option_2_Users_create_a_GOVUK_One_Login_to_save_progress_02_2023.pdf")
    );
});

router.get("/documentation/design-recommendations", (req, res) => {
    res.render("documentation-design-recommendations.njk");
});

router.get("/getting-started/private-beta", (req, res) => {
    res.render("getting-started-private-beta.njk");
});

router.get("/service-unavailable", (req, res) => {
    res.render("service-unavailable.njk");
});

router.get("/documentation/design-recommendations/save-progress", (req, res) => {
    res.render("documentation-save-progress.njk");
});

router.get("/documentation/design-recommendations/change-credentials", (req, res) => {
    res.render("documentation-change-credentials.njk");
});

router.get("/about", (req, res) => {
    res.render("about.njk");
});

export default router;
