import { Request, Response } from 'express';
import Validation from "../lib/validation";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";

let requiredFields = new Map<string, string>();
requiredFields.set("email", "Enter your government email address");
requiredFields.set("name", "Enter your name");
requiredFields.set("service-name", "Enter the name of your service");
requiredFields.set("organisation-name", "Enter your organisation name");

export const get = function(req: Request, res: Response) {
    const errorMessages = new Map();
    const values = new Map();
    res.render('register.njk', {errorMessages: errorMessages, values: values});
}

export const post = async function(req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    const errorMessages = (req.app.get('validation') as Validation).validate(values, requiredFields);

    if (errorMessages.size == 0) {
        values.set('id', uuid());
        values.set('submission-date', getTimestamp());

        let redirectTo = '/register-confirm'

        let sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => redirectTo = '/register-error');
        await sheetsService.appendValues(
            values,
            process.env.REGISTER_SHEET_DATA_RANGE as string,
            process.env.REGISTER_SHEET_HEADER_RANGE as string)
            .catch(reason => {
                console.log(reason);
                redirectTo = '/register-error'
            });
        console.log("Saved to sheets");
        res.redirect(redirectTo);
    } else {
        res.render('register.njk',
            {
                errorMessages: errorMessages,
                values: values,
                fieldOrder:
                    [
                        "name",
                        "organisation-name",
                        "email",
                        "service-name"
                    ]
            });
    }
}

export const confirm = function(req: Request, res: Response) {
    res.render('register-confirm.njk');
};

export const error = function(req: Request, res: Response) {
    res.render('register-error.njk');
}