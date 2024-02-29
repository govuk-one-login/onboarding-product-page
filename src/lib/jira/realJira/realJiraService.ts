import axios from "axios";
import {getEnv} from "../../util/getEnv";
import {JiraPostResponse, JiraService} from "../interface";

export default class RealJiraService implements JiraService {
    private readonly jiraBoardUrl: string;
    private readonly projectKey: string;
    private readonly issueType: string;
    private readonly jiraUsername: string;
    private readonly jiraApiKey: string;

    constructor() {
        this.jiraBoardUrl = getEnv("JIRA_BOARD_URL");
        this.projectKey = getEnv("JIRA_PROJECT_KEY");
        this.issueType = getEnv("JIRA_ISSUE_TYPE");
        this.jiraUsername = getEnv("JIRA_USER_NAME");
        this.jiraApiKey = getEnv("JIRA_API_KEY");
    }

    private formatJiraTicket(ticketPayload: Map<string, string>): Record<string, unknown> {
        return {
            fields: {
                issuetype: {
                    id: this.issueType
                },
                project: {
                    key: this.projectKey
                },
                summary: `${ticketPayload.get("organisationName")}: ${ticketPayload.get("serviceName")}`,
                description: {
                    version: 1,
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: ticketPayload.get("serviceDescription")
                                }
                            ]
                        }
                    ]
                }
            }
        };
    }

    async postJiraTicket(ticketPayload: Map<string, string>): Promise<JiraPostResponse> {
        const formattedTicketPayload = this.formatJiraTicket(ticketPayload);
        const jiraResponse = await axios.post(this.jiraBoardUrl, JSON.stringify(formattedTicketPayload), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            auth: {
                username: this.jiraUsername,
                password: this.jiraApiKey
            }
        });
        return jiraResponse.data as JiraPostResponse;
    }
}
