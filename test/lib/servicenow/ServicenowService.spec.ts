import {expect} from "chai";
import "mocha";
import ServicenowService from "../../../src/lib/servicenow/ServicenowService";

describe("ServicenowService", () => {
    let servicenowService: ServicenowService;

    beforeEach(() => {
        servicenowService = new ServicenowService();
    });

    describe("init", () => {
        it("should use stub service when USE_STUB_SERVICENOW is true", async () => {
            process.env.USE_STUB_SERVICENOW = "true";
            await servicenowService.init();
            expect(servicenowService["implementation"].constructor.name).to.equal("StubServicenowService");
        });

        it("should use real service when USE_STUB_SERVICENOW is not true", async () => {
            process.env.USE_STUB_SERVICENOW = "false";
            await servicenowService.init();
            expect(servicenowService["implementation"].constructor.name).to.equal("RealServicenowService");
        });
    });

    describe("submit", () => {
        it("should forward the submit call to the implementation", async () => {
            const testForm = new Map<string, string>();
            testForm.set("key", "value");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const mockSubmit = async (form: Map<string, string>): Promise<boolean> => {
                return true;
            };
            servicenowService["implementation"] = {submit: mockSubmit};
            const response = await servicenowService.submit(testForm);
            expect(response).to.be.true;
        });
    });
});
