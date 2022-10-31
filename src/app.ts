import bodyParser from "body-parser";
import express, {NextFunction, Request, Response} from "express";
import configureViews from "./config/configureViews";
import Validation from "./lib/validation/validation";
import contactUs from "./routes/contact-us";
import decide from "./routes/decide";
import mailingList from "./routes/mailing-list";
import redirects from "./routes/redirects";
import register from "./routes/register";
import site from "./routes/site";
import support from "./routes/support";

const app = express();
app.set("validation", Validation.getInstance());
app.use("/dist", express.static("./dist/assets"));
app.use(express.static("./dist"));

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
app.use("/decide", decide);
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
