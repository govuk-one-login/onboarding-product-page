import {Request, Response} from "express";
import Validation from "../lib/validation/validation";
import ZendeskService from "../lib/zendesk/ZendeskService";
import crypto from "crypto";

const requiredFields = new Map<string, string>([
    ["name", "Enter your name"],
    ["email", "Enter your government email address"],
    ["role", "Enter your role"],
    ["organisation-name", "Enter the name of your organisation"],
    ["service-name", "Enter the name of your service"],
    ["how-can-we-help", "Tell us how we can help"]
]);

export const showForm = function (req: Request, res: Response) {
    res.render("contact-us.njk");
};

export const submitForm = async function (req: Request, res: Response) {
    const values = new Map<string, string>();
    Object.keys(req.body).forEach(key => values.set(key, req.body[key].trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFields);

    if (errorMessages.size == 0) {
        let zendeskTag;
        const ticketIdentifier = crypto.randomBytes(27).toString("base64url");

        if (req.originalUrl === "/contact-us?adminTool") {
            zendeskTag = process.env.ZENDESK_TAG_ONE_LOGIN_ADMIN_TOOL as string;
            values.set("contact-form-support", "Self Service Admin Tool");
            values.set("ticket-identifier", ticketIdentifier);
        } else {
            zendeskTag = process.env.ZENDESK_TAG as string;
            values.set("contact-form-support", "Government service team that is setting up or already using GOV.UK One Login");
        }

        const zendesk = new ZendeskService(
            process.env.ZENDESK_USERNAME as string,
            process.env.ZENDESK_API_TOKEN as string,
            zendeskTag,
            process.env.ZENDESK_GROUP_ID as string
        );

        await zendesk.init();
        if (await zendesk.submit(values)) {
            res.redirect("contact-us-submitted");
        } else {
            res.redirect("contact-us-error");
        }
    } else {
        res.render("contact-us.njk", {
            errorMessages: errorMessages,
            values: values
        });
    }
};

export const confirmation = function (req: Request, res: Response) {
    res.render("contact-us-confirm.njk");
};
