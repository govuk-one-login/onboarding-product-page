import {RequestHandler} from "express";
import Validation from "../lib/validation/validation";

export const processPrototypeEmailForm: RequestHandler = async (req, res) => {
    const requiredFields = new Map<string, string>([["email", "Enter your government email address"]]);
    const values = new Map<string, string>();
    Object.keys(req.body).forEach(key => values.set(key, req.body[key].trim()));

    const errorMessages = (req.app.get("validation") as Validation).validate(values, requiredFields);

    if (errorMessages.size == 0) {
        res.redirect("/documentation/end-to-end-prototype/check-email");
    } else {
        res.render("documentation-enter-email-address.njk", {
            errorMessages: errorMessages,
            values: values
        });
    }
};
