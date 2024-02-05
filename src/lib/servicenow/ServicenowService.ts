import ServicenowInterface from "./interface";

export default class ServicenowService implements ServicenowInterface {
    private implementation!: ServicenowInterface;

    async init() {
        let implementation: string;
        if (typeof process.env.USE_STUB_SERVICENOW !== "undefined" && process.env.USE_STUB_SERVICENOW == "true") {
            implementation = "./stubServicenow/stubServicenowService";
            console.log("Using Stub Servicenow Service");
        } else {
            implementation = "./realServicenow/realServicenowService";
            console.log("Using Real Servicenow Service");
        }
        const module = await import(implementation);
        const service = module.default;
        this.implementation = new service();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async submit(form: Map<string, string>): Promise<any> {
        return this.implementation.submit(form);
    }
}
