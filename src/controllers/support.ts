import {Request, Response} from "express";
import Validation from "../lib/validation";

const requiredFields = new Map<string, string>([["support", "You must select an option to tell us what you need help with"]]);

export const showForm = function (req: Request, res: Response) {
    res.render("support.njk");
};

export const submitForm = function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFields);

    if (errorMessages.size > 0) {
        res.render("support.njk", {errorMessages: errorMessages});
        return;
    }

    switch (values.get("support")) {
        case "gov-service-start-using-sign-in":
            res.redirect("/contact-us-details");
            return;
        case "gov-service-uses-sign-in":
            res.redirect("/contact-us");
            return;
        case "gov-service-is-public":
            res.redirect("https://signin.account.gov.uk/contact-us?supportType=PUBLIC");
            return;
    }
};
