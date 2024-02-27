export default interface JiraInterface {
    appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void>;
}
