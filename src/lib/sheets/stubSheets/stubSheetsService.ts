import SheetsService from "../interface";

export default class StubSheetsService implements SheetsService {
    private readonly spreadsheetId: string;

    constructor(spreadsheetId: string) {
        console.log("StubSheetsServiceConstructor");
        this.spreadsheetId = spreadsheetId;
    }

    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        return new Promise<void>(resolve => {
            console.log(`Pretending to save data to sheet "${this.spreadsheetId}"`);
            resolve();
        });
    }
}
