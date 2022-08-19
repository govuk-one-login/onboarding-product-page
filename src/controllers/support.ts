import {Request, Response} from 'express';
import Validation from "../lib/validation";

const requiredFields = new Map<string, string>([
    ['support', 'You must select an option to tell us what you need help with']
]);

export const showForm = function (req: Request, res: Response) {
    res.render('support.njk');
}

export const submitForm = function (req: Request, res: Response) {
    const values = new Map<string, string>(Object.entries(req.body));
    const errorMessages = (req.app.get('validation') as Validation).validate(values, requiredFields);

    if (errorMessages.has('support')) {
        res.render('support.njk', {errorMessages: errorMessages});
    } else {
        if (values.get('support') === 'gov-service-start-using-sign-in') {
            res.redirect('/contact-us-details');
        }
        if (values.get('support') === 'gov-service-uses-sign-in') {
            res.redirect('/contact-us');
        }
        if (values.get('support') === 'gov-service-is-public') {
            res.redirect('https://signin.account.gov.uk/contact-us?supportType=PUBLIC');
        }
    }
}
