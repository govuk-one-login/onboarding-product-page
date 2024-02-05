import ServicenowInterface from "../interface";

export default class ServicenowService implements ServicenowInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submit(form: Map<string, string>): Promise<boolean> {
        return Promise.resolve(true);
    }
}
