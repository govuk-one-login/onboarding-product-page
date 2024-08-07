import {Request, Response} from "express";
import uuid from "../lib/uuid";
import getTimestamp from "../lib/timestamp";
import SheetsService from "../lib/sheets/SheetsService";
import Validation from "../lib/validation/validation";
import JiraTicketService from "../lib/jira/JiraTicketService";
import axios from "axios";

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
    ["expectedNumberOfUsersPerAnnum", "Enter the number of users you expect annually"],
    ["estimatedServiceGoLiveDate", "Enter a month and year"],
    ["accessAndTest", "Select one option"],
    ["anyOtherServicesToTalkAbout", "Select one option"],
    ["getUpdatesAboutOneLogin", "Select one option"],
    ["migrateExistingUsers", "Select one option"]
]);

export const post = async function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));

    values.forEach((value, key) => values.set(key, value.trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFieldsRegister);

    if (errorMessages.size == 0) {
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

        if (req.body.migrateExistingUsers === "yes") {
            values.set("migrateExistingUsers", "Yes");
        } else {
            values.set("migrateExistingUsers", "No");
        }

        values.set("id", uuid());
        values.set("submission-date", getTimestamp());

        let redirectTo = "/register-confirm";

        if (process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED !== "false") {
            const sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
            await sheetsService.init().catch(() => (redirectTo = "/register-error"));
            await sheetsService
                .appendValues(values, process.env.REGISTER_SHEET_DATA_RANGE as string, process.env.REGISTER_SHEET_HEADER_RANGE as string)
                .catch(reason => {
                    console.log(reason);
                    redirectTo = "/register-error";
                });
            console.log("Saved to sheets");
        }

        if (process.env.JIRA_INTEGRATION_ENABLED === "true") {
            console.log("Using Jira integration");
            try {
                const jiraService = new JiraTicketService(values);
                await jiraService.sendJiraTicket();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Jira Post request failed with status code: ", error.status);
                    console.error("Axios Error, errorMessages Object: ", error.response?.data?.errorMessages);
                    console.error("Axios Error, errors Object: ", error.response?.data?.errors);
                } else {
                    console.error("Jira Integration error: ", error);
                }
                redirectTo = "/register-error";
            }
        }
        res.redirect(redirectTo);
    } else {
        res.render("register.njk", {
            errorMessages: errorMessages,
            values: values
        });
    }
};
