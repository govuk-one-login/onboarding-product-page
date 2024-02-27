import JiraService from "../interface";

export default class StubJiraService implements JiraService {
    private readonly projectId: string;
    private readonly issueType: string;

    constructor(projectId: string, issueType: string) {
        console.log("StubJiraServiceConstructor");
        this.projectId = projectId;
        this.issueType = issueType;
    }

    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        return new Promise<void>(resolve => {
            console.log(`Pretending to save data to sheet "${this.projectId} and ${this.issueType}"`);
            resolve();
        });
    }
}
