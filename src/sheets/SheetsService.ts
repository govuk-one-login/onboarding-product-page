import SheetsInterface from "./interface";

export default class SheetsService implements SheetsInterface {
    private implementation!: SheetsInterface;
    private spreadsheetId: string

    constructor(spreadsheetId: string) {
        this.spreadsheetId = spreadsheetId;
    }

    async init() {
        if (process.env.USE_STUB_SHEETS == 'true') {
            console.log("Using Stub Sheets Service")
            let module = await import('./stubSheets/stubSheetsService');
            let service = module.default;
            this.implementation = new service(this.spreadsheetId);
        } else {
            console.log("Using the actual implemntation of the Sheets Service")
            let module = await import('./realSheets/realSheetsService');
            let service = module.default;
            this.implementation = new service(this.spreadsheetId);
        }
    }

    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        return this.implementation.appendValues(form, dataRange, headerRange);
    }
}
