import {Request, Response} from "express";
import Validation from "../lib/validation/validation";
import crypto from "crypto";
import ServicenowService from "../lib/servicenow/ServicenowService";

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
        const ticketIdentifier = crypto.randomBytes(27).toString("base64url");

        if (req.originalUrl === "/contact-us?adminTool") {
            values.set("contact-form-support", "Self Service Admin Tool");
            values.set("ticket-identifier", ticketIdentifier);
        } else {
            values.set("contact-form-support", "Government service team that is setting up or already using GOV.UK One Login");
        }

        const servicenow = new ServicenowService();
        await servicenow.init();
        const servicenowSubmit = await servicenow.submit(values);
        if (servicenowSubmit) {
            res.redirect("contact-us-submitted");
        } else {
            res.redirect("service-unavailable");
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
