import axios from "axios";
import {JIRA_BOARD_URL, JIRA_ISSUE_TYPE, JIRA_PROJECT_KEY} from "../../../config/jiraConfig";
import {getRequiredEnv} from "../../util/getRequiredEnv";
import {JiraPostResponse, JiraService, JiraStructuredContent, JiraTicketContentSection} from "../interface";

export default class RealJiraService implements JiraService {
    private readonly jiraBoardUrl: string;
    private readonly projectKey: string;
    private readonly issueType: string;
    private readonly jiraUsername: string;
    private readonly jiraApiKey: string;

    constructor() {
        this.jiraBoardUrl = JIRA_BOARD_URL;
        this.projectKey = JIRA_PROJECT_KEY;
        this.issueType = JIRA_ISSUE_TYPE;
        this.jiraUsername = getRequiredEnv("JIRA_USER_NAME");
        this.jiraApiKey = getRequiredEnv("JIRA_API_KEY");
    }

    private ticketSummary(ticketPayload: Map<string, string>): string {
        return `${ticketPayload.get("organisationName")}: ${ticketPayload.get("serviceName")}`;
    }

    private ticketContactPreferences(ticketPayload: Map<string, string>): JiraTicketContentSection[] {
        const anyOtherServicesToTalkAbout = ticketPayload.get("anyOtherServicesToTalkAbout");
        const getUpdatesAboutOneLogin = ticketPayload.get("getUpdatesAboutOneLogin");
        const otherServicesToDiscuss = anyOtherServicesToTalkAbout === "Yes" ? "Has other services to discuss: Yes ✅" : undefined;
        const addToMailingList = getUpdatesAboutOneLogin === "YES" ? "Add to mailing list: Yes ✅" : undefined;

        const headingPayload = [
            {
                type: "heading",
                attrs: {level: 3},
                content: [{type: "text", text: "Contact Preferences"}]
            }
        ];

        const contentPayload = [
            ...(addToMailingList ? [{type: "text", text: addToMailingList}] : []),
            ...(otherServicesToDiscuss && addToMailingList ? [{type: "hardBreak"}] : []),
            ...(otherServicesToDiscuss ? [{type: "text", text: otherServicesToDiscuss}] : [])
        ];

        const bodyPayload = [
            {
                type: "paragraph",
                content: contentPayload
            }
        ];

        return [
            ...(otherServicesToDiscuss || addToMailingList ? headingPayload : []),
            ...(addToMailingList || otherServicesToDiscuss ? bodyPayload : [])
        ];
    }

    private ticketDescription(ticketPayload: Map<string, string>): JiraStructuredContent {
        const contactFirstName = ticketPayload.get("firstName");
        const contactLastName = ticketPayload.get("lastName");
        const contactEmail = ticketPayload.get("email");
        const contactEmailMailto = contactEmail ? {marks: [{type: "link", attrs: {href: `mailto:${contactEmail}`}}]} : {};
        const contactLastRole = ticketPayload.get("role");

        return {
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
                        {type: "text", text: `First Name: ${contactFirstName}`},
                        {type: "hardBreak"},
                        {type: "text", text: `Last Name: ${contactLastName}`},
                        {type: "hardBreak"},
                        {type: "text", text: `Email: ${contactEmail}`},
                        {
                            type: "text",
                            text: contactEmail,
                            ...contactEmailMailto
                        },
                        {type: "hardBreak"},
                        {type: "text", text: `Role: ${contactLastRole}`}
                    ]
                },
                ...this.ticketContactPreferences(ticketPayload)
            ]
        };
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
                summary: this.ticketSummary(ticketPayload),
                description: this.ticketDescription(ticketPayload)
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
