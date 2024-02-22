import {expect} from "chai";
import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import axios from "axios";
import RealServicenowService from "../../../../src/lib/servicenow/realServicenow/realServicenowService";
import * as oauth2TokenModule from "../../../../src/lib/oauth2Token";

chai.use(chaiAsPromised);

describe("RealServicenowService", () => {
    let realServicenowService: RealServicenowService;
    let axiosStub: sinon.SinonStub;
    let fetchOAuth2TokenStub: sinon.SinonStub;

    const form = new Map([
        ["organisation-name", "Test Organisation"],
        ["service-name", "Test Service"],
        ["name", "Test User"],
        ["email", "test@gov.uk"],
        ["contact-form-support", "Need help with something"],
        ["role", "developer"],
        ["how-can-we-help", "I need help with login"]
    ]);

    beforeEach(() => {
        realServicenowService = new RealServicenowService();

        fetchOAuth2TokenStub = sinon
            .stub(oauth2TokenModule, "fetchOAuth2Token")
            .resolves({access_token: "mocked_access_token", token_type: "bearer", expires_in: 1600});

        process.env.SERVICENOW_URL = "https://mock-servicenow-url.gov.uk";
        process.env.SERVICENOW_AUTH_CREDENTIALS = JSON.stringify({
            accessTokenUrl: "https://mock-token-url.gov.uk",
            clientId: "mockClientId",
            clientSecret: "mockClientSecret",
            username: "mockUsername",
            password: "mockPassword"
        });
    });

    afterEach(() => {
        delete process.env.SERVICENOW_URL;
        delete process.env.SERVICENOW_AUTH_CREDENTIALS;
        sinon.restore();
    });

    it("should successfully submit a form and return true", async () => {
        axiosStub = sinon.stub(axios, "create").returns({
            post: sinon.stub().resolves({status: 200, statusText: "OK"})
            // eslint-disable-next-line
        } as any);
        await expect(realServicenowService.submit(form)).to.eventually.be.true;
        sinon.assert.calledOnce(fetchOAuth2TokenStub);
        const axiosInstance = axiosStub.returnValues[0];
        sinon.assert.calledWith(axiosInstance.post, sinon.match.string, sinon.match.object);
    });

    it("should return false on HTTP post request failure", async () => {
        sinon.stub(axios, "create").returns({
            post: sinon.stub().rejects(new Error("Network error"))
            // eslint-disable-next-line
        } as any);
        const realServicenowService = new RealServicenowService();
        const form = new Map();
        await expect(realServicenowService.submit(form)).to.eventually.be.false;
    });
});
