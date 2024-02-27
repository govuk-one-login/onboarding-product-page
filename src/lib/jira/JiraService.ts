import JiraInterface from "./interface";

export default class JiraService implements JiraInterface {
    private implementation!: JiraInterface;
    private projectId: string;
    private issueType: string;

    constructor(projectId: string, issueType: string) {
        this.projectId = projectId;
        this.issueType = issueType;
    }

    async init() {
        if (process.env.USE_STUB_JIRA == "true") {
            console.log("Using Stub Jira Service");
            const module = await import("./stubJira/stubJiraService");
            const service = module.default;
            this.implementation = new service(this.projectId, this.issueType);
        } else {
            console.log("Using the actual implemntation of the Jira Service");
            const module = await import("./realJira/realJiraService");
            const service = module.default;
            this.implementation = new service(this.projectId, this.issueType);
        }
    }

    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        return this.implementation.appendValues(form, dataRange, headerRange);
    }
}
