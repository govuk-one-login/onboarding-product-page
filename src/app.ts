import bodyParser from "body-parser";
import express, {NextFunction, Request, Response} from "express";
import Helmet from "./config/helmet";
import configureViews from "./config/configureViews";
import {distribution} from "./config/resources";
import Validation from "./lib/validation/validation";
import contactUs from "./routes/contact-us";
import mailingList from "./routes/mailing-list";
import redirects from "./routes/redirects";
import register from "./routes/register";
import site from "./routes/site";
import support from "./routes/support";
import path from "path";

const app = express();
app.set("validation", Validation.getInstance());

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(Helmet());

app.use("/assets", express.static(distribution.assets));
app.use("/assets/images", express.static(distribution.images));
app.use("/ga4-assets", express.static(path.join(__dirname, "../node_modules/@govuk-one-login/one-login-analytics/lib")));

app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true
    })
);

configureViews(app);

app.use("/", register);
app.use("/", contactUs);
app.use("/", site);
app.use("/", redirects);
app.use("/", support);
app.use("/", mailingList);

app.locals.showTestBanner = process.env.SHOW_TEST_BANNER === "true";
app.locals.adminToolUrl = process.env.ADMIN_TOOL_URL || "https://admin.sign-in.service.gov.uk";
app.locals.ga4ContainerId = process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID;
app.locals.uaContainerId = process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID;
app.locals.ga4Disabled = process.env.GA4_DISABLED;
app.locals.uaDisabled = process.env.UA_DISABLED;
app.locals.cookieDomain = process.env.COOKIE_DOMAIN || "sign-in.service.gov.uk";

app.use((req: Request, res: Response) => {
    res.status(404).render("404.njk");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Error handling middleware must take 4 arguments
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500);
    res.render("there-is-a-problem.njk", {showLinkToContactForm: req.path !== "/contact-us"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running; listening on port ${port}`));
