import {promises as fs} from 'fs';
import {JWT} from 'googleapis-common';
import {google} from 'googleapis';
import SheetsService from "../interface";

export default class RealSheetsService implements SheetsService{
    private jwt: JWT | undefined = undefined;
    private SCOPES: string[] = ['https://www.googleapis.com/auth/spreadsheets'];
    private spreadsheetId: string;

    constructor(spreadsheetId: string) {
        this.spreadsheetId = spreadsheetId;
    }

    private async readCreds(): Promise<string> {
        return await fs.readFile('./credentials.json', 'utf-8');
    }

    private async createToken(data: any): Promise<JWT> {
        return new Promise(async (resolve, reject) => {
            try {
                let creds = JSON.parse(data);
                this.jwt = new JWT(creds.client_email,
                    undefined,
                    creds.private_key,
                    this.SCOPES,
                    undefined
                );
                resolve(this.jwt)
            } catch (error) {
                reject(error)
            }
        });
    }

    private async readRange(token: JWT, range: string, sheetId: string): Promise<any[][]> {
        return new Promise(
            async function (resolve, reject) {
                let sheets = google.sheets('v4');
                try {
                    const response = await sheets.spreadsheets.values.get(
                        {
                            auth: token,
                            spreadsheetId: sheetId,
                            range: range
                        })
                    const data = response.data;
                    console.log("Values: " + data.values)
                    if (data.values) {
                        resolve(data.values)
                    } else {
                        reject(new Error(`No values returned for range ${range} from sheet with ID ${sheetId}`))
                    }
                } catch (error) {
                    reject(new Error(`Could not read range ${range} from sheet with ID ${sheetId}`))
                }
            })
    }

    private async createRow(token: JWT, form: any, headings: any[][]): Promise<any[][]> {
        let row: any[] = [];
        headings[0].forEach(heading => row.push(form[heading]));
        return row;
    }


    private async appendRow(token: JWT, range: string, row: any[]) {
        let request: any = {
            auth: token,
            spreadsheetId: this.spreadsheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [row]
            }
        }

        let sheets = google.sheets('v4');
        const response = (await sheets.spreadsheets.values.append(request)).data;
        console.log(JSON.stringify(response, null, 2));
    }

    async appendValues(form: any, headerRange: string): Promise<void> {
        let creds: string = await this.readCreds();
        let token: JWT = await this.createToken(creds);
        let headings: any[] = await this.readRange(token, headerRange, this.spreadsheetId)
        let dataToInsert: any[] = await this.createRow(token, form, headings);
        await this.appendRow(token, 'Register!A1', dataToInsert);
    }
}
