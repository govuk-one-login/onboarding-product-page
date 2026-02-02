import {expect} from "chai";
import express from "express";
import request from "supertest";
import pino from "pino";
import {Writable} from "stream";
import helmet from "helmet";
import pinoHttp from "pino-http";
import {responseSerializer} from "../../src/lib/requestLogging";

describe("Request Logging Middleware", () => {
    it("should filter response headers correctly", async () => {
        const logs: any[] = [];
        const stream = new Writable({
            write(chunk, encoding, callback) {
                logs.push(JSON.parse(chunk.toString()));
                callback();
            }
        });

        const testLogger = pino(stream);
        const middleware = pinoHttp({
            logger: testLogger,
            customProps: () => ({}),
            serializers: {res: responseSerializer}
        });

        const app = express();
        app.use(helmet());
        app.use(middleware);
        app.get("/test", (req, res) => res.status(200).send("OK"));

        await request(app).get("/test").set("User-Agent", "test-agent");

        const requestLog = logs.find(log => log.req && log.res);
        expect(requestLog).to.exist;
        expect(requestLog.res.headers["content-type"]).to.exist;
        expect(requestLog.res.headers["content-length"]).to.exist;
        expect(requestLog.res.headers["content-security-policy"]).to.be.undefined;
    });
});
