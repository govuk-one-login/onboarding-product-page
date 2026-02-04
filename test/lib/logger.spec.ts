import {expect} from "chai";
import logger from "../../src/lib/logger";

describe("Logger", () => {
    it("should export a logger instance", () => {
        expect(logger).to.exist;
        expect(logger.info).to.be.a("function");
        expect(logger.error).to.be.a("function");
        expect(logger.warn).to.be.a("function");
        expect(logger.debug).to.be.a("function");
    });

    it("should have correct log level", () => {
        const expectedLevel = process.env.LOG_LEVEL || "info";
        expect(logger.level).to.equal(expectedLevel);
    });
});
