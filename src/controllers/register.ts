import {Request, Response} from "express";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation/validation";

export const confirm = function (req: Request, res: Response) {
    res.render("register-confirm.njk");
};

export const error = function (req: Request, res: Response) {
    res.render("register-error.njk");
};

export const get = function (req: Request, res: Response) {
    res.render("register.njk");
};

const requiredFieldsRegister = new Map<string, string>([
    ["firstName", "Enter your first name"],
    ["lastName", "Enter your last name"],
    ["email", "Enter your government email address"],
    ["role", "Enter your role or job title"],
    ["organisationName", "Enter your organisation name"],
    ["organisationType", "Select one option"],
    ["serviceName", "Enter the name of your service"],
    ["serviceDescription", "Enter a short description of your service"],
    ["totalAnnualNumberOfUsersOfYourService", "Select one option"],
    ["estimatedServiceGoLiveDate", "Enter a month and year"],
    ["accessAndTest", "Select one option"],
    ["helpWith", "Select one or more options"],
    ["anyOtherServicesToTalkAbout", "Select one option"],
    ["getUpdatesAboutOneLogin", "Select one option"]
]);

export const post = async function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));

    if (req.body.helpWith) {
        values.delete("helpWith");
        values.set("helpWith", req.body.helpWith.toString());
    }

    values.forEach((value, key) => values.set(key, value.trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFieldsRegister);

    if (req.body.helpWith && (req.body.helpWith === "other" || req.body.helpWith.includes("other")) && req.body.likeHelpWith === "") {
        errorMessages.set("likeHelpWith", "Enter a short description of what you need help with");
    }

    if (errorMessages.size == 0) {
        const helpWithMappings = {
            gettingAccess: "Access to integration",
            havingTechnicalDiscussion: "Technical discussion",
            walkingThrough: "Onboarding walkthrough",
            understandingProgramme: "Programme detail"
        };

        for (const [key, value] of Object.entries(helpWithMappings)) {
            if (req.body.helpWith.includes(key)) {
                values.set(key, value);
            }
        }

        if (req.body.helpWith.includes("other")) {
            values.set("likeHelpWith", req.body.likeHelpWith);
        }

        const organisationTypeMappings = {
            governmentDepartmentOrMinistry: "Government department or Ministry",
            executiveAgency: "Executive Agency",
            armsLengthBody: "Arms length body",
            other: "Other"
        };

        for (const [key, value] of Object.entries(organisationTypeMappings)) {
            if (req.body.organisationType === key) {
                values.set("organisationType", value);
                break;
            }
        }

        const totalAnnualNumberMappings = {
            range1To1000: "1 to 1,000",
            range1001To50000: "1,001 to 50,000",
            range50001To250000: "50,001 to 250,000",
            range250001To1Million: "250,001 to 1 million",
            rangeOver1Million: "Over 1 million users"
        };

        for (const [key, value] of Object.entries(totalAnnualNumberMappings)) {
            if (req.body.totalAnnualNumberOfUsersOfYourService === key) {
                values.set("totalAnnualNumberOfUsersOfYourService", value);
                break;
            }
        }

        if (req.body.accessAndTest === "authenticationOnly") {
            values.set("accessAndTest", "auth only");
        } else {
            values.set("accessAndTest", "auth and identity");
        }

        if (req.body.anyOtherServicesToTalkAbout === "yes") {
            values.set("anyOtherServicesToTalkAbout", "Yes");
        } else {
            values.set("anyOtherServicesToTalkAbout", "");
        }

        values.set("id", uuid());
        values.set("submission-date", getTimestamp());

        let redirectTo = "/register-confirm";

        const sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => (redirectTo = "/register-error"));
        await sheetsService
            .appendValues(values, process.env.REGISTER_SHEET_DATA_RANGE as string, process.env.REGISTER_SHEET_HEADER_RANGE as string)
            .catch(reason => {
                console.log(reason);
                redirectTo = "/register-error";
            });

        console.log("Saved to sheets");
        res.redirect(redirectTo);
    } else {
        res.render("register.njk", {
            errorMessages: errorMessages,
            values: values,
            selectedItems: req.body.helpWith
        });
    }
};
