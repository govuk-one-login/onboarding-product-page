import {Request, Response} from "express";
import SheetsService from "../lib/sheets/SheetsService";
import getTimestamp from "../lib/timestamp";
import uuid from "../lib/uuid";
import Validation from "../lib/validation/validation";

const requiredFields = new Map<string, string>([
    ["name", "Enter your name"],
    ["email", "Enter your government email address"],
    ["department-name", "Enter your department"],
    ["service-name", "Enter the name of your service"]
]);

export const showRequestForm = function (req: Request, res: Response) {
    const errorMessages = new Map();
    const values = new Map();
    res.render("request.njk", {errorMessages: errorMessages, values: values});
};

export const submitRequestForm = async function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFields);

    if (errorMessages.size == 0) {
        values.set("id", uuid());
        values.set("submission-date", getTimestamp());

        let redirectTo = "/decide/private-beta/request-submitted";

        const sheetsService: SheetsService = new SheetsService(process.env.REQUEST_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => (redirectTo = "/decide/private-beta/request-error"));
        await sheetsService
            .appendValues(values, process.env.REQUEST_SHEET_DATA_RANGE as string, process.env.REQUEST_SHEET_HEADER_RANGE as string)
            .then(() => console.log("Saved to sheets"))
            .catch(reason => {
                console.log(reason);
                redirectTo = "/decide/private-beta/request-error";
            });
        res.redirect(redirectTo);
    } else {
        res.render("request.njk", {
            errorMessages: errorMessages,
            values: values,
            fieldOrder: ["name", "email", "department-name", "service-name"]
        });
    }
};

export const requestSubmitted = function (req: Request, res: Response) {
    res.render("request-submitted.njk");
};

export const error = function (re: Request, res: Response) {
    res.render("request-error.njk");
};
