import express from "express";
import request from "supertest";
import {expect} from "chai";
import router from "../../src/routes/site";
import configureViews from "../../src/config/configureViews";

describe("Router for main site urls", () => {
    const app = express();
    before(() => {
        configureViews(app);
        app.use("/", router);
    });
    // eslint-disable-next-line
    function getGetRoutes(router: any) {
        const routes: string[] = [];
        // eslint-disable-next-line
        router.stack.forEach((middleware: any) => {
            if (middleware.route && middleware.route.methods.get) {
                routes.push(middleware.route.path);
            } else if (middleware.name === "router") {
                // eslint-disable-next-line
                middleware.handle.stack.forEach((handler: any) => {
                    if (handler.route && handler.route.methods.get) {
                        routes.push(handler.route.path);
                    }
                });
            }
        });
        return routes;
    }

    const routes = getGetRoutes(router);

    routes.forEach(url => {
        it(`should handle the GET request for the URL ${url}`, async () => {
            const response = await request(app).get(url);
            expect(response.status).to.equal(200);

            const contentType = response.headers["content-type"] || "";

            if (contentType.includes("text/html")) {
                expect(response.text).to.contain('<div class="govuk-header__logo">'); // Check for specific content in your template
            } else if (contentType.includes("application/pdf")) {
                expect(contentType).to.include("application/pdf");
            }
        });
    });
});
