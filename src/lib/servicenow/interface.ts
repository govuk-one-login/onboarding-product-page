export default interface ServicenowInterface {
    submit(form: Map<string, string>): Promise<boolean>;
}
