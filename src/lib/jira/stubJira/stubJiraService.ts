import {randomUUID} from "crypto";
import {JiraPostResponse, JiraService, RegisterInterestFormPayload} from "../interface";

export default class StubJiraService implements JiraService {
    private readonly jiraBoardUrl: string;
    private readonly projectKey: string;

    constructor(boardUrl: string, projectKey: string) {
        this.jiraBoardUrl = boardUrl;
        this.projectKey = projectKey;
    }

    async postJiraTicket(ticketPayload: RegisterInterestFormPayload): Promise<JiraPostResponse> {
        console.log(`Pretending to post Jira ticket to boardUrl: '${this.jiraBoardUrl}'`);
        console.log("Ticket payload: ", ticketPayload);
        const ticketId = randomUUID();
        return {
            id: ticketId,
            key: this.projectKey,
            self: `${this.jiraBoardUrl}/${ticketId}`
        };
    }
}
