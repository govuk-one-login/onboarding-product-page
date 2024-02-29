import axios from 'axios';
import sinon from 'sinon';
import RealJiraService  from'../../../../src/lib/jira/realJira/realJiraService'
import { testApiKey, testBoardUrl, testFormSubmission, testIssueType, testProjectKey, testUserName } from '../testConstants';




const testFormattedJiraPayload = {
        fields: {
            issuetype: {
                id: testIssueType
            },
            project: {
                key: testProjectKey
            },
            summary: `${testFormSubmission.get("organisationName")}: ${testFormSubmission.get("serviceName")}`,
            description: {
                version: 1,
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text: testFormSubmission.get('serviceDescription')
                            }
                        ]
                    }
                ]
            }
        }
}

let axiosStub: sinon.SinonStub

describe('realJiraService tests', () => {
    beforeEach(() => {
        sinon.createSandbox();
        axiosStub = sinon.stub(axios, "post");
        axiosStub.resolves({
            data: {
                id: '12345',
                key: 'testKey', 
                self: 'https://testboard.atlassian.net/rest/api/3/issue/12345'
            }
        })
        process.env.JIRA_BOARD_URL = testBoardUrl
        process.env.JIRA_PROJECT_KEY = testProjectKey
        process.env.JIRA_ISSUE_TYPE = testIssueType
        process.env.JIRA_USER_NAME = testUserName
        process.env.JIRA_API_KEY = testApiKey
    })

    afterEach(() => {
        sinon.restore()
        delete process.env.JIRA_BOARD_URL 
        delete process.env.JIRA_PROJECT_KEY 
        delete process.env.JIRA_ISSUE_TYPE 
        delete process.env.JIRA_USER_NAME 
        delete process.env.JIRA_API_KEY 
    })

    it('posts a ticket to the board url when postJiraTicket is called', async() => {
        const jiraService = new RealJiraService()
        jiraService.postJiraTicket(testFormSubmission)
        sinon.assert.calledWith(axiosStub, testBoardUrl, JSON.stringify(testFormattedJiraPayload), {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            auth: {
                username: testUserName, 
                password: testApiKey
            }
        })

    })
})