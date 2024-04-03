import {Request, Response} from "express";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";

export const requestPrototypeAccess = async function (req: Request, res: Response) {
    const values = new Map<string, string>();

    values.set("id", uuid());
    values.set("submission-date", getTimestamp());
    values.set("email", req.body.email);

    const sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);

    try {
        await sheetsService.init();
        await sheetsService.appendValues(
            values,
            process.env.HTML_PROTOTYPE_ACCESS_SHEET_DATA_RANGE as string,
            process.env.HTML_PROTOTYPE_ACCESS_SHEET_HEADER_RANGE as string
        );
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500);
        res.render("there-is-a-problem.njk");
    }
};
