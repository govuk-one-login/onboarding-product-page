import StubJiraService from "../../../../src/lib/jira/stubJira/stubJiraService";
import {expect} from "chai";
import sinon from "sinon";
import crypto from "crypto";
import {testFormSubmission} from "../testConstants";

const testBoardUrl = "https://testBoard.atlassian.net/rest/api/3/issue";
const testProjectKey = "TEST123";
const fakeUuid = "9f3c176f-e612-fake--15f053d92ed8";
let consoleSpy: sinon.SinonSpy;
let cryptoStub: sinon.SinonStub;

describe("StubJiraService tests", () => {
    beforeEach(() => {
        sinon.createSandbox();
        consoleSpy = sinon.spy(console, "log");
        cryptoStub = sinon.stub(crypto, "randomUUID");
        cryptoStub.returns(fakeUuid);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("mocks the JiraService", async () => {
        const testJiraResponse = await new StubJiraService(testBoardUrl, testProjectKey).postJiraTicket(testFormSubmission);
        sinon.assert.calledWith(consoleSpy, `Pretending to post Jira ticket to boardUrl: '${testBoardUrl}'`);
        sinon.assert.calledWith(consoleSpy, "Ticket payload: ", testFormSubmission);
        expect(testJiraResponse).to.deep.equal({
            id: fakeUuid,
            key: testProjectKey,
            self: `${testBoardUrl}/${fakeUuid}`
        });
    });
});
