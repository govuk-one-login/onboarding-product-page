import ZendeskInterface from "../interface";

export default class StubZendeskService implements ZendeskInterface {
    private email: string;
    private apiToken: string;
    private tag: string;

    constructor(email: string, apiToken: string, tag: string) {
        this.email = email;
        this.apiToken = apiToken;
        this.tag = tag;
    }


    submit(form:  Map<string, string>): Promise<boolean> {
        return Promise.resolve(true);
    }
}
