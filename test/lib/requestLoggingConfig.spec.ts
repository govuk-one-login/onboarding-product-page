import {expect} from "chai";
import {responseSerializer} from "../../src/lib/requestLogging";

describe("Request Logging Middleware Configuration", () => {
    it("should serialize response with only allowed headers", () => {
        const mockRes = {
            statusCode: 200,
            raw: {
                getHeader: (name: string) => {
                    const headers: Record<string, string> = {
                        "content-type": "text/html",
                        "content-length": "123",
                        etag: 'W/"123"',
                        "content-security-policy": "default-src 'self'"
                    };
                    return headers[name];
                }
            }
        };

        const serialized = responseSerializer(mockRes);
        expect(serialized.statusCode).to.equal(200);
        expect(serialized.headers["content-type"]).to.equal("text/html");
        expect(serialized.headers["content-length"]).to.equal("123");
        expect(serialized.headers["etag"]).to.equal('W/"123"');
        expect((serialized.headers as any)["content-security-policy"]).to.be.undefined;
    });
});
