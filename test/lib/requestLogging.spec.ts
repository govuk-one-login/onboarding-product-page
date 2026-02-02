import {expect} from "chai";
import express from "express";
import request from "supertest";
import pinoHttp from "pino-http";
import logger from "../../src/lib/logger";

describe("Request Logging Middleware", () => {
    it("should integrate pino-http middleware with logger", async () => {
        const app = express();
        app.use(pinoHttp({logger}));
        app.get("/test", (req, res) => {
            expect(req.log).to.exist;
            expect(req.log.info).to.be.a("function");
            res.status(200).send("OK");
        });

        const response = await request(app).get("/test").set("User-Agent", "test-agent");
        expect(response.status).to.equal(200);
    });
});
