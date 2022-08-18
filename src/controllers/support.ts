import { Request, Response } from 'express';

export const showForm = function(req: Request, res: Response) {
    res.render('support/support.njk');
}

export const submitForm = function(req: Request, res: Response) {
    if (req.body && Object.keys(req.body).length === 0) {
        res.render('support/support.njk', {valueNotSelected: true});
    } else {
        if (req.body.support === 'gov-service-start-using-sign-in') {
            res.redirect('/contact-us-details');
        }
        if (req.body.support === 'gov-service-uses-sign-in') {
            res.redirect('/contact-us');
        }
        if (req.body.support === 'gov-service-is-public') {
            res.redirect('https://signin.account.gov.uk/contact-us?supportType=PUBLIC');
        }
    }
}
