import {promises as fs} from "fs";
import {JWT} from "googleapis-common";
import {google} from "googleapis";
import SheetsService from "../interface";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class RealSheetsService implements SheetsService {
    private readonly SCOPES: string[] = ["https://www.googleapis.com/auth/spreadsheets"];
    private readonly SPREADSHEET_ID: string;

    private jwt: JWT | undefined = undefined;

    constructor(spreadsheetId: string) {
        this.SPREADSHEET_ID = spreadsheetId;
    }

    private static async readCreds(): Promise<string> {
        const serviceCredentials: {[index: string]: any[]} = JSON.parse(process.env.VCAP_SERVICES || "null");

        if (serviceCredentials) {
            const googleCreds = serviceCredentials["user-provided"].find(creds => creds.name == "google-service-account")?.credentials;

            if (!googleCreds) {
                throw "Google Service account credentials are missing from the environment";
            }

            return JSON.stringify(googleCreds);
        } else {
            return await fs.readFile("./googleCredentials.json", "utf-8");
        }
    }

    private async createToken(data: any): Promise<JWT> {
        return new Promise(async (resolve, reject) => {
            try {
                const creds = JSON.parse(data);
                this.jwt = new JWT(creds.client_email, undefined, creds.private_key, this.SCOPES, undefined);
                resolve(this.jwt);
            } catch (error) {
                reject(error);
            }
        });
    }

    private async readRange(token: JWT, range: string, sheetId: string): Promise<any[][]> {
        return new Promise(async function (resolve, reject) {
            const sheets = google.sheets("v4");
            try {
                const response = await sheets.spreadsheets.values.get({
                    auth: token,
                    spreadsheetId: sheetId,
                    range: range
                });
                const data = response.data;
                if (data.values) {
                    resolve(data.values);
                } else {
                    reject(new Error(`No values returned for range ${range} from sheet with ID ${sheetId}`));
                }
            } catch (error) {
                console.log(error);
                reject(new Error(`Could not read range ${range} from sheet with ID ${sheetId}`));
            }
        });
    }

    private async createRow(token: JWT, form: Map<string, string>, headings: any[][]): Promise<any[][]> {
        const row: any[] = [];
        headings[0].forEach(heading => {
            row.push(form.get(heading));
        });
        return row;
    }

    private async appendRow(token: JWT, range: string, row: any[]) {
        const request: any = {
            auth: token,
            spreadsheetId: this.SPREADSHEET_ID,
            range: range,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [row]
            }
        };

        const sheets = google.sheets("v4");
        await sheets.spreadsheets.values.append(request);
    }

    async appendValues(form: Map<string, string>, dataRange: string, headerRange: string): Promise<void> {
        const creds: string = await RealSheetsService.readCreds();
        const token: JWT = await this.createToken(creds);
        const headings: any[] = await this.readRange(token, headerRange, this.SPREADSHEET_ID);
        const dataToInsert: any[] = await this.createRow(token, form, headings);
        await this.appendRow(token, dataRange, dataToInsert);
    }
}
