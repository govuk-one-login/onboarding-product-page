import express from "express";
import path from "path";
import {resources} from "../config/resources";
import {requestPrototypeAccess} from "../controllers/html-prototype-access";

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

router.get("/getting-started/public-beta", (req, res) => {
    res.render("getting-started-public-beta.njk");
});

router.get("/service-unavailable", (req, res) => {
    res.render("service-unavailable.njk");
});

router.get("/documentation/design-recommendations/save-progress", (req, res) => {
    res.render("documentation-save-progress.njk");
});

router.get("/documentation/design-recommendations/business-users", (req, res) => {
    res.render("documentation-business-users.njk");
});

router.get("/documentation/design-recommendations/change-credentials", (req, res) => {
    res.render("documentation-change-credentials.njk");
});

router.get("/documentation/design-recommendations/migrating-sign-in-pattern", (req, res) => {
    res.render("documentation-migrating-sign-in-pattern.njk");
});

router.get("/documentation/design-recommendations/barriers-to-proving-identity", (req, res) => {
    res.render("documentation-barriers-prove-identity.njk");
});

router.get("/about", (req, res) => {
    res.render("about.njk");
});

router.get("/about/signing-users-in", (req, res) => {
    res.render("about/signing-users-in.njk");
});

router.get("/about/checking-users-identities", (req, res) => {
    res.render("about/checking-users-identities.njk");
});

router.get("/about/signed-in-experience", (req, res) => {
    res.render("about/signed-in-experience.njk");
});

router.get("/documentation/design-recommendations/let-users-navigate-sign-out", (req, res) => {
    res.render("documentation-let-users-navigate.njk");
});

router.get("/about/checking-users-identities/evidence-types", (req, res) => {
    res.render("about/evidence-types.njk");
});

router.get("/documentation/identity-journeys", (req, res) => {
    res.render("documentation-identity-journeys.njk");
});

router.get("/documentation/end-to-end-prototype/identity-journeys", (req, res) => {
    res.render("documentation-end-to-end-prototype.njk");
});

router.get("/documentation/end-to-end-prototype/enter-email-address", (req, res) => {
    res.render("documentation-enter-email-address.njk");
});

router.post("/documentation/end-to-end-prototype/enter-email-address", requestPrototypeAccess);

router.get("/documentation/end-to-end-prototype/check-email", (req, res) => {
    res.render("documentation-check-email.njk");
});

router.get("/documentation/design-recommendations/migrating-users", (req, res) => {
    res.render("documentation-migrating-users.njk");
});

router.get("/documentation/design-recommendations/how-to-talk-about", (req, res) => {
    res.render("documentation-how-to-talk-about.njk");
});

router.get("/documentation/design-recommendations/prepare-to-move", (req, res) => {
    res.render("documentation-prepare-to-move.njk");
});

router.get("/documentation/design-recommendations/start-page", (req, res) => {
    res.render("documentation-start-page.njk");
});

export default router;
