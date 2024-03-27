import {JiraInterface, JiraService} from "./interface";
import StubJiraService from "./stubJira/stubJiraService";
import RealJiraService from "./realJira/realJiraService";

export default class JiraTicketService implements JiraInterface {
    private ticketData: Map<string, string>;
    public jiraService: JiraService;

    constructor(ticketData: Map<string, string>) {
        this.ticketData = ticketData;
        if (process.env.USE_STUB_JIRA === "false") {
            console.log("Using Real Jira Service");
            this.jiraService = new RealJiraService();
        } else {
            console.log("Using Stub Jira Service");
            this.jiraService = new StubJiraService("stubBoardUrl", "stubProjectKey");
        }
    }
    async sendJiraTicket(): Promise<void> {
        const result = await this.jiraService.postJiraTicket(this.ticketData);
        console.log(`Sent to Jira with Ticket Id ${result.id}`);
    }
}
