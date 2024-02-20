import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import axios from "axios";
import {fetchOAuth2Token} from "../../src/lib/oauth2Token";

describe("fetchOAuth2Token", () => {
    let axiosPostStub: sinon.SinonStub;
    let consoleErrorStub: sinon.SinonStub;
    chai.use(chaiAsPromised);
    const expect = chai.expect;

    beforeEach(() => {
        axiosPostStub = sinon.stub(axios, "post");
        consoleErrorStub = sinon.stub(console, "error");
    });

    afterEach(() => {
        axiosPostStub.restore();
        consoleErrorStub.restore();
    });

    it("should successfully fetch an OAuth2 token", async () => {
        const mockResponse = {
            data: {
                access_token: "mocked_access_token",
                token_type: "bearer",
                expires_in: 1600,
                refresh_token: "mocked_refresh_token",
                scope: "test_scope"
            }
        };

        axiosPostStub.resolves(mockResponse);

        const accessTokenUrl = "https://test.co.uk/oauth2/token";
        const clientId = "yourClientId";
        const clientSecret = "yourClientSecret";
        const username = "testUser";
        const password = "testPassword";

        const result = await fetchOAuth2Token(accessTokenUrl, clientId, clientSecret, username, password);

        expect(result).to.deep.equal(mockResponse.data);
        expect(axiosPostStub.calledOnce).to.be.true;
    });

    it("should throw an error if the request fails", async () => {
        const errorMessage = "Request failed with status code 400";
        axiosPostStub.rejects(new Error(errorMessage));

        const accessTokenUrl = "https://test.co.uk/oauth2/token";
        const clientId = "yourClientId";
        const clientSecret = "yourClientSecret";
        const username = "testUser";
        const password = "testPassword";

        await expect(fetchOAuth2Token(accessTokenUrl, clientId, clientSecret, username, password)).to.be.rejectedWith(Error, errorMessage);
    });
});
