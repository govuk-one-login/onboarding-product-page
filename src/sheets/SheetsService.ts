import SheetsInterface from "./interface";

export default class SheetsService implements SheetsInterface {
    private implementation!: SheetsInterface;
    private spreadsheetId: string

    constructor(spreadsheetId: string) {
        this.spreadsheetId = spreadsheetId;
    }

    async init() {
        if (process.env.ENVIRONMENT == 'development') {
            console.log("Using Stub Sheets Service as we're in a development environment")
            let module = await import('./stubSheets/stubSheetsService');
            let service = module.default;
            this.implementation = new service(this.spreadsheetId);
        } else {
            console.log("Using the actual implemntation of the Sheets Service as we're in a non-dev environment")
            let module = await import('./realSheets/realSheetsService');
            let service = module.default;
            this.implementation = new service(this.spreadsheetId);
        }
    }

    async appendValues(form: any, headerRange: string): Promise<void> {
        return this.implementation.appendValues(form, headerRange);
    }
}
