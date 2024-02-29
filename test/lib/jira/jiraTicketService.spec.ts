import axios from 'axios'
import sinon from "sinon";
import JiraTicketService from '../../../src/lib/jira/JiraTicketService'
import { testApiKey, testBoardUrl, testFormSubmission, testIssueType, testProjectKey, testUserName } from './testConstants';


let axiosStub: sinon.SinonStub;
let consoleSpy: sinon.SinonSpy;

describe("JiraService tests", () => {
    beforeEach(() => {
        sinon.createSandbox();
        axiosStub = sinon.stub(axios, "post");
        consoleSpy = sinon.spy(console, "log");
        axiosStub.resolves({
            data: {
                id: '1234'
            }
        })

    });

    afterEach(() => {
        sinon.restore();
        delete process.env.USE_JIRA_STUB;
    });

    it('uses the stub service when USE_JIRA_STUB is set to true', async () => {
        process.env.USE_JIRA_STUB = 'true'
        const stubJiraService = new JiraTicketService(testFormSubmission)
        sinon.assert.calledWith(consoleSpy, 'Using Stub Jira Service')
        await stubJiraService.sendJiraTicket()
        sinon.assert.notCalled(axiosStub)
    })

    it('uses the stub service when USE_JIRA_STUB is not set', async () => {
        const stubJiraService = new JiraTicketService(testFormSubmission)
        sinon.assert.calledWith(consoleSpy, 'Using Stub Jira Service')
        await stubJiraService.sendJiraTicket()
        sinon.assert.notCalled(axiosStub)
    })

    it('uses the real service when USE_JIRA_STUB is set to false', async () => {
        process.env.USE_JIRA_STUB = 'false'
        process.env.JIRA_BOARD_URL = testBoardUrl
        process.env.JIRA_PROJECT_KEY = testProjectKey
        process.env.JIRA_ISSUE_TYPE = testIssueType
        process.env.JIRA_USER_NAME = testUserName
        process.env.JIRA_API_KEY = testApiKey
        const stubJiraService = new JiraTicketService(testFormSubmission)
        sinon.assert.calledWith(consoleSpy,'Using Real Jira Service')
        await stubJiraService.sendJiraTicket()
        sinon.assert.calledOnce(axiosStub)
    })

});
