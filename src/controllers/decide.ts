import {Request, Response, NextFunction} from 'express';
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation";
import getTimestamp from "../lib/timestamp";
import uuid from "../lib/uuid";

export const decide = function (req: Request, res: Response) {
    res.render('decide.njk');
}

export const timescales = function (req: Request, res: Response) {
    res.render('decide-timescales.njk');
}

export const userJourneys = function (req: Request, res: Response) {
    res.render('decide-user-journeys.njk');
}

export const designPatterns = function(req: Request, res: Response) {
    res.render('decide-design-patterns.njk');
}


export const privateBeta = function (req: Request, res: Response) {
    res.render('decide-private-beta.njk');
}

export const showRequestForm = function (req: Request, res: Response) {
    const errorMessages = new Map();
    const values = new Map();
    res.render('request.njk', {errorMessages: errorMessages, values: values});
}

export const submitRequestForm = async function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("department-name", "Enter your department");

    const validator = new Validation(values, requiredFields);
    await validator.loadExtendedEmailDomains();
    const errorMessages = validator.validate();

    if (errorMessages.size == 0) {
        values.set('id', uuid());
        values.set('submission-date', getTimestamp());

        let redirectTo = '/decide/private-beta/request-submitted'

        let sheetsService: SheetsService = new SheetsService(process.env.REQUEST_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => redirectTo = '/register-error');
        await sheetsService.appendValues(
            values,
            process.env.REQUEST_SHEET_DATA_RANGE as string,
            process.env.REQUEST_SHEET_HEADER_RANGE as string)
            .then(() => console.log("Saved to sheets"))
            .catch(reason => {
                console.log(reason)
                redirectTo = '/register-error'
            });
        res.redirect(redirectTo);
    } else {
        res.render('request.njk',
            {
                errorMessages: errorMessages,
                values: values,
                fieldOrder:
                    [
                        "name",
                        "email",
                        "department-name",
                        "service-name"
                    ]
            });
    }
}

export const requestSubmitted = function (req: Request, res: Response) {
    res.render('request-submitted.njk');
}