import JiraService from "../interface";

export default class RealJiraService implements JiraService {
    private readonly projectId: string;
    private readonly issueType: string;

    constructor(projectId: string, issueType: string) {
        this.projectId = projectId;
        this.issueType = issueType;
    }
    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        return new Promise<void>(resolve => {
            console.log(`Send data to Jira for "${this.projectId}", ${this.issueType}`);
            console.log(`Send data to Jira for "${form}", ${dataRange}, ${headerRange}`);
            resolve();
        });
    }
}
