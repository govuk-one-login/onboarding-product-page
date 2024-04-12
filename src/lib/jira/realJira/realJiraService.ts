import axios from "axios";
import {JIRA_BOARD_URL, JIRA_ISSUE_TYPE, JIRA_PROJECT_KEY} from "../../../config/jiraConfig";
import {getRequiredEnv} from "../../util/getRequiredEnv";
import {
    JiraPostResponse,
    JiraService,
    JiraStructuredContent,
    JiraTicketContentSection,
    JiraCustomFieldPayload,
    JiraCustomFieldChoice,
    RegisterInterestFormPayload
} from "../interface";

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

    private ticketSummary(ticketPayload: RegisterInterestFormPayload): string {
        return `${ticketPayload.get("organisationName")}: ${ticketPayload.get("serviceName")}`;
    }

    private ticketContactPreferences(ticketPayload: RegisterInterestFormPayload): JiraTicketContentSection[] {
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

    private ticketDescription(ticketPayload: RegisterInterestFormPayload): JiraStructuredContent {
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

    private ticketOrganisationType(ticketPayload: RegisterInterestFormPayload): JiraCustomFieldPayload | null {
        const organisationType = ticketPayload.get("organisationType");

        switch (organisationType) {
            case "Government department or Ministry":
                return this.formatCustomFieldWithValue("Government department or Ministry", "12098");
            case "Executive Agency":
                return this.formatCustomFieldWithValue("Executive Agency", "12099");
            case "Arms length body":
                return this.formatCustomFieldWithValue("Arms length body", "12100");
            case "Other":
                return this.formatCustomFieldWithValue("Other", "12101");
            default:
                return null;
        }
    }

    private ticketServiceDescription(ticketPayload: RegisterInterestFormPayload): JiraStructuredContent {
        return this.formatTicketJiraParagraph(ticketPayload.get("serviceDescription"));
    }

    private ticketServiceIntegrationType(ticketPayload: RegisterInterestFormPayload): JiraCustomFieldChoice | null {
        const accessType = ticketPayload.get("accessAndTest");

        if (accessType === "auth only") {
            return this.formatCustomFieldWithValue("Auth Only", "11205");
        } else if (accessType === "auth and identity") {
            return this.formatCustomFieldWithValue("Auth / Identity", "11204");
        } else {
            return null;
        }
    }

    private formatTicketJiraParagraph(value: string | number | undefined): JiraStructuredContent {
        return {
            version: 1,
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [{type: "text", text: value}]
                }
            ]
        };
    }

    private formatCustomFieldWithValue(value: string | number | undefined, customFieldID: string): JiraCustomFieldChoice {
        return {
            self: `https://govukverify.atlassian.net/rest/api/3/customFieldOption/${customFieldID}`,
            value: value,
            id: customFieldID
        };
    }

    private formatExpectedNumberOfUsersPerAnnum(ticketPayload: RegisterInterestFormPayload): number | null {
        try {
            return Number(ticketPayload.get("expectedNumberOfUsersPerAnnum"));
        } catch {
            return null;
        }
    }

    private formatAdditionalHelpOrQuestions(ticketPayload: RegisterInterestFormPayload): JiraStructuredContent {
        return this.formatTicketJiraParagraph(ticketPayload.get("additionalHelpOrQuestions"));
    }

    private formatJiraTicket(ticketPayload: RegisterInterestFormPayload): Record<string, unknown> {
        return {
            fields: {
                issuetype: {
                    id: this.issueType
                },
                project: {
                    key: this.projectKey
                },
                summary: this.ticketSummary(ticketPayload),
                description: this.ticketDescription(ticketPayload),
                customfield_11278: this.formatExpectedNumberOfUsersPerAnnum(ticketPayload),
                customfield_11530: ticketPayload.get("organisationName"),
                customfield_11541: this.ticketOrganisationType(ticketPayload),
                customfield_11338: ticketPayload.get("serviceName"),
                customfield_11533: this.ticketServiceDescription(ticketPayload),
                customfield_11224: this.ticketServiceIntegrationType(ticketPayload),
                customfield_11544: this.formatAdditionalHelpOrQuestions(ticketPayload),
                customfield_11545: ticketPayload.get("linkToYourService"),
                customfield_11546: ticketPayload.get("estimatedServiceGoLiveDate"),
                customfield_11539: ticketPayload.get("id"),
                customfield_11540: ticketPayload.get("submission-date")
            }
        };
    }

    async postJiraTicket(ticketPayload: RegisterInterestFormPayload): Promise<JiraPostResponse> {
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
