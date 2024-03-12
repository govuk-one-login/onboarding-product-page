import axios from "axios";
import sinon from "sinon";
import {JIRA_BOARD_URL, JIRA_ISSUE_TYPE, JIRA_PROJECT_KEY} from "../../../../src/config/jiraConfig";
import RealJiraService from "../../../../src/lib/jira/realJira/realJiraService";
import {testApiKey, testFormSubmission, testUserName} from "../testConstants";

const testFormattedJiraPayload = {
    fields: {
        issuetype: {
            id: JIRA_ISSUE_TYPE
        },
        project: {
            key: JIRA_PROJECT_KEY
        },
        summary: "Government Coffee Service: CoffeeTest",
        description: {
            version: 1,
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "A user has registered their interest in GOV.UK One Login"
                        }
                    ]
                },
                {
                    type: "heading",
                    attrs: {level: 3},
                    content: [{type: "text", text: "Initial Contact Details"}]
                },
                {
                    type: "paragraph",
                    content: [
                        {type: "text", text: "First Name: TestUserFirstName"},
                        {type: "hardBreak"},
                        {type: "text", text: "Last Name: TestUserLastName"},
                        {type: "hardBreak"},
                        {type: "text", text: "Email: some.TestUser@GovCoffee.gov.uk"},
                        {
                            type: "text",
                            text: "some.TestUser@GovCoffee.gov.uk",
                            marks: [{type: "link", attrs: {href: "mailto:some.TestUser@GovCoffee.gov.uk"}}]
                        },
                        {type: "hardBreak"},
                        {type: "text", text: "Role: Chief Coffee Tester"}
                    ]
                },
                {
                    type: "heading",
                    attrs: {level: 3},
                    content: [{type: "text", text: "Contact Preferences"}]
                },
                {
                    type: "paragraph",
                    content: [
                        {type: "text", text: "Add to mailing list: Yes ✅"},
                        {type: "hardBreak"},
                        {type: "text", text: "Has other services to discuss: Yes ✅"}
                    ]
                }
            ]
        },
        customfield_11542: {
            self: "https://govukverify.atlassian.net/rest/api/3/customFieldOption/12106",
            value: "Over 1 million users",
            id: "12106"
        }
    }
};

let axiosStub: sinon.SinonStub;

describe("realJiraService tests", () => {
    beforeEach(() => {
        sinon.createSandbox();
        axiosStub = sinon.stub(axios, "post");
        axiosStub.resolves({
            data: {
                id: "12345",
                key: "testKey",
                self: "https://testboard.atlassian.net/rest/api/3/issue/12345"
            }
        });

        process.env.JIRA_USER_NAME = testUserName;
        process.env.JIRA_API_KEY = testApiKey;
    });

    afterEach(() => {
        sinon.restore();
        delete process.env.JIRA_USER_NAME;
        delete process.env.JIRA_API_KEY;
    });

    it("posts a ticket to the board url when postJiraTicket is called", async () => {
        const jiraService = new RealJiraService();
        jiraService.postJiraTicket(testFormSubmission);
        sinon.assert.calledWith(axiosStub, JIRA_BOARD_URL, JSON.stringify(testFormattedJiraPayload), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            auth: {
                username: testUserName,
                password: testApiKey
            }
        });
    });
});
