import {Request, Response} from "express";
import Validation from "../lib/validation/validation";

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
            res.redirect("https://onelogingovuk.service-now.com/csm?id=csm_sc_cat_item&sys_id=83902cb51b4822900a549978b04bcbed");
            return;
        case "gov-service-is-public":
            res.redirect("https://home.account.gov.uk/contact-gov-uk-one-login");
            return;
    }
};
