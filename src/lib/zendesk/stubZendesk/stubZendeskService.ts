import ZendeskInterface from "../interface";

export default class StubZendeskService implements ZendeskInterface {
    submit(form: Map<string, string>): Promise<boolean> {
        return Promise.resolve(true);
    }
}
