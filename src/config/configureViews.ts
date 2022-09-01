import {Express} from "express-serve-static-core";
import {configure, render} from "nunjucks";
import * as path from "path";

export default function (app: Express, viewPath = path.join(__dirname, "../../src/views")) {
    const govukViews = require.resolve("govuk-frontend").match(/.*govuk-frontend\//)?.[0];

    if (!govukViews) {
        throw "Couldn't load govuk-frontend module";
    }

    configure([viewPath, govukViews], {
        autoescape: true,
        noCache: true,
        express: app
    });

    app.engine("njk", render);
}
