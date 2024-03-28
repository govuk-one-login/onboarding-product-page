import {Request, Response} from "express";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation/validation";

const requiredFieldsRegister = new Map<string, string>([["email", "Enter your government email address"]]);

export const post = async function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));

    values.forEach((value, key) => values.set(key, value.trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFieldsRegister);

    if (errorMessages.size == 0) {
        values.set("id", uuid());
        values.set("submission-date", getTimestamp());
        values.set("email", req.body.email);

        // TODO: should be its own confirm page
        let redirectTo = "/register-confirm";

        const sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => (redirectTo = "/register-error"));
        await sheetsService
            .appendValues(
                values,
                process.env.HTML_PROTOTYPE_ACCESS_SHEET_DATA_RANGE as string,
                process.env.HTML_PROTOTYPE_ACCESS_SHEET_HEADER_RANGE as string
            )
            .catch(reason => {
                console.log(reason);
                redirectTo = "/register-error";
            });

        console.log("Saved to sheets");
        res.redirect(redirectTo);
    } else {
        // TODO: for now just show this
        res.render("there-is-a-problem.njk", {showLinkToContactForm: req.path !== "/contact-us"});
    }
};
