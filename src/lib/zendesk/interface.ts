export default interface ZendeskInterface {
    submit(form: Map<string, string>): Promise<boolean>;
}
