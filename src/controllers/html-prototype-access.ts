import {Request, Response} from "express";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation/validation";

export const requestPrototypeAccess = async function (req: Request, res: Response) {
    const requiredFields = new Map<string, string>([["email", "Enter your government email address"]]);
    const values = new Map<string, string>();
    Object.keys(req.body).forEach(key => values.set(key, req.body[key].trim()));
    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFields);

    if (errorMessages.size == 0) {
        const sheetValues = new Map<string, string>();
        sheetValues.set("id", uuid());
        sheetValues.set("submission-date", getTimestamp());
        sheetValues.set("email", req.body.email);
        const sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
        try {
            await sheetsService.init();
            await sheetsService.appendValues(
                sheetValues,
                process.env.HTML_PROTOTYPE_ACCESS_SHEET_DATA_RANGE as string,
                process.env.HTML_PROTOTYPE_ACCESS_SHEET_HEADER_RANGE as string
            );
            res.redirect("/documentation/end-to-end-prototype/check-email");
        } catch (err) {
            console.error(err);
            res.status(500);
            res.render("there-is-a-problem.njk");
        }
    } else {
        res.render("documentation-enter-email-address.njk", {
            errorMessages: errorMessages,
            values: values
        });
    }
};
