import bodyParser from "body-parser";
import express, {NextFunction, Request, Response} from "express";
import configureViews from "./config/configureViews";
import {distribution} from "./config/resources";
import Validation from "./lib/validation/validation";
import contactUs from "./routes/contact-us";
import mailingList from "./routes/mailing-list";
import redirects from "./routes/redirects";
import register from "./routes/register";
import site from "./routes/site";
import support from "./routes/support";

const app = express();
app.set("validation", Validation.getInstance());

app.use("/assets", express.static(distribution.assets));
app.use("/assets/images", express.static(distribution.images));

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

app.locals.googleTagId = process.env.GOOGLE_TAG_ID;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404.njk");
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500);
    res.render("there-is-a-problem.njk", {showLinkToContactForm: req.path !== "/contact-us"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running; listening on port ${port}`));
