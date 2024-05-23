import ZendeskInterface from "../interface";

export default class StubZendeskService implements ZendeskInterface {
    // eslint-disable-next-line
    submit(form: Map<string, string>): Promise<boolean> {
        return Promise.resolve(true);
    }
}
