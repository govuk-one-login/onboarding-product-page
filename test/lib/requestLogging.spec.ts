import {expect} from "chai";
import express from "express";
import request from "supertest";
import pino from "pino";
import {Writable} from "stream";
import helmet from "helmet";
import pinoHttp from "pino-http";
import {requestSerializer, responseSerializer} from "../../src/lib/requestLogging";

interface LogEntry {
    req: {
        headers: Record<string, string | undefined>;
    };
    res: {
        headers: Record<string, string | number | undefined>;
    };
}

describe("Request Logging Middleware", () => {
    it("should filter response headers correctly", async () => {
        const logs: Record<string, unknown>[] = [];
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
            serializers: {req: requestSerializer, res: responseSerializer}
        });

        const app = express();
        app.use(helmet());
        app.use(middleware);
        app.get("/test", (req, res) => res.status(200).send("OK"));

        await request(app).get("/test").set("User-Agent", "test-agent").set("Referer", "http://example.com");

        const requestLog = logs.find(log => log.req && log.res) as LogEntry | undefined;
        expect(requestLog).to.exist;
        if (requestLog) {
            expect(requestLog.req.headers["user-agent"]).to.equal("test-agent");
            expect(requestLog.req.headers.referer).to.equal("http://example.com");
            expect(requestLog.res.headers["content-type"]).to.exist;
            expect(requestLog.res.headers["content-length"]).to.exist;
            expect(requestLog.res.headers["content-security-policy"]).to.be.undefined;
        }
    });
});
