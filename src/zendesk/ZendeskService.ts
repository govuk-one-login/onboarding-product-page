import ZendeskInterface from "./interface";

export default class SheetsService implements ZendeskInterface {
    private implementation!: ZendeskInterface;
    private email: string;
    private apiToken: string;
    private tag: string;

    constructor(email: string, apiToken: string, tag: string) {
        this.email = email;
        this.apiToken = apiToken;
        this.tag = tag;
    }

    async init() {
        let implementation: string;
        if (process.env.USE_STUB_ZENDESK == 'true') {
            implementation = './stubZendesk/stubZendeskService';
            console.log("Using Stub Zendesk Service")
        } else {
            implementation = './stubZendesk/realZendeskService';
            console.log("Using Real Zendesk Service")
        }
        let module = await import(implementation);
        let service = module.default;
        this.implementation = new service(this.email, this.apiToken, this.tag);
    }

    async submit(form: boolean): Promise<any> {
        return this.implementation.submit(form);
    }
}
