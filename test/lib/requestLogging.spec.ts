import {expect} from "chai";
import express from "express";
import request from "supertest";
import pinoHttp from "pino-http";
import pino from "pino";
import {Writable} from "stream";

describe("Request Logging Middleware", () => {
    it("should log HTTP requests with structured data", async () => {
        const logs: any[] = [];
        const stream = new Writable({
            write(chunk, encoding, callback) {
                logs.push(JSON.parse(chunk.toString()));
                callback();
            }
        });

        const testLogger = pino(stream);
        const app = express();
        app.use(pinoHttp({logger: testLogger}));
        app.get("/test", (req, res) => res.status(200).send("OK"));

        await request(app).get("/test").set("User-Agent", "test-agent");

        expect(logs.length).to.be.greaterThan(0);
        const requestLog = logs.find(log => log.req && log.res);
        expect(requestLog).to.exist;
        expect(requestLog.req.method).to.equal("GET");
        expect(requestLog.req.url).to.equal("/test");
        expect(requestLog.res.statusCode).to.equal(200);
        expect(requestLog.responseTime).to.be.a("number");
    });
});
