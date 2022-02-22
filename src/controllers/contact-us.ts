import { Request, Response } from 'express';
import Validation from "../lib/validation";
import ZendeskService from "../lib/zendesk/ZendeskService";

export const showForm = function(req: Request, res: Response) {
    const errorMessages = new Map();
    const values = new Map();
    res.render('contact-us.njk', {errorMessages: errorMessages, values: values});
}

export const submitForm = async function(req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("role", "Enter your role");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("organisation-name", "Enter the name of your organisation");
    requiredFields.set("how-can-we-help", "Tell us how we can help");

    const validator = new Validation(values, requiredFields);
    await validator.loadExtendedEmailDomains();
    const errorMessages = validator.validate();

    if (errorMessages.size == 0) {
        const zendesk = new ZendeskService(
            process.env.ZENDESK_USERNAME as string,
            process.env.ZENDESK_API_TOKEN as string,
            process.env.ZENDESK_TAG as string,
            process.env.ZENDESK_GROUP_ID as string
        );
        await zendesk.init();
        if (await zendesk.submit(values)) {
            res.redirect('contact-us-submitted')
        } else {
            res.redirect('contact-us-error')
        }
    } else {
        res.render('contact-us.njk',
            {
                errorMessages: errorMessages,
                values: values,
                fieldOrder:
                    [
                        "name",
                        "email",
                        "role",
                        "organisation-name",
                        "service-name",
                        "how-can-we-help"
                    ]
            });
    }
}

export const confirmation = function(req: Request, res: Response) {
    res.render('contact-us-confirm.njk');
}
