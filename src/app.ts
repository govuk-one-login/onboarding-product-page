import SheetsService from "./sheets/SheetsService";
import express from 'express';
import configureViews from './lib/configureViews';
import Validation from './validation'

import uuid from "./lib/uuid";
import getTimestamp from "./lib/timestamp";
import ZendeskService from "./zendesk/ZendeskService";

const app = express();
const bodyParser = require('body-parser')

app.use('/dist', express.static('./dist/assets'));
app.use(express.static('./dist'));

configureViews(app);
app.get('/', (req, res) => {
    res.render('index.njk');
});

app.get('/identity-checks', (req, res) => {
    res.render('identity-checks.njk');
});

app.get('/find-out-more', (req, res) => {
    res.render('find-out-more.njk');
});

app.get('/getting-started', (req, res) => {
    res.render('getting-started.njk');
});

app.get('/accessibility', (req, res) => {
    res.render('accessibility.njk');
});

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy.njk');
});

app.get('/cookies', (req, res) => {
    res.render('cookies.njk');
});

app.get('/register-confirm', (req, res) => {
    res.render('register-confirm.njk');
});

app.get('/register-error', (req, res) => {
    res.render('register-error.njk');
});

app.get('/decide', (req, res) => {
    res.render('decide.njk');
});

app.get('/contact-us', (req, res) => {
    const errorMessages = new Map();
    const values = new Map();
    res.render('contact-us.njk', {errorMessages: errorMessages, values: values});
});

app.get('/contact-us', (req, res) => {
    const errorMessages = new Map();
    const values = new Map();
    res.render('contact-us.njk', {errorMessages: errorMessages, values: values});
});

app.get('/decide/timescales', (req, res) => {
    res.render('decide-timescales.njk');
});

app.get('/decide/user-journeys', (req, res) => {
    res.render('decide-user-journeys.njk');
});

app.get('/decide/private-beta/request-submitted', (req, res) => {
    res.render('request-submitted.njk');
});

app.get('/decide/design-patterns', (req, res) => {
    res.render('decide-design-patterns.njk');
});

app.get('/decide/private-beta', (req, res) => {
    res.render('decide-private-beta.njk');
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/register', (req, res) => {
    const errorMessages = new Map();
    const values = new Map();
    res.render('register.njk', {errorMessages: errorMessages, values: values});
});

app.post('/register', async (req, res) => {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("organisation-name", "Enter your organisation name");

    const validator = new Validation(values, requiredFields);
    await validator.loadExtendedEmailDomains();
    const errorMessages = validator.validate();

    if (errorMessages.size == 0) {
        values.set('id', uuid());
        values.set('submission-date', getTimestamp());

        let redirectTo = '/register-confirm'

        let sheetsService: SheetsService = new SheetsService(process.env.REGISTER_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => redirectTo = '/register-error');
        await sheetsService.appendValues(
            values,
            process.env.REGISTER_SHEET_DATA_RANGE as string,
            process.env.REGISTER_SHEET_HEADER_RANGE as string)
            .catch(reason => {
                console.log(reason);
                redirectTo = '/register-error'
            });
        console.log("Saved to sheets");
        res.redirect(redirectTo);
    } else {
        res.render('register.njk',
            {
                errorMessages: errorMessages,
                values: values,
                fieldOrder:
                    [
                        "name",
                        "organisation-name",
                        "email",
                        "service-name"
                    ]
            });
    }
});


app.get('/decide/private-beta/request-form', (req, res) => {
    const errorMessages = new Map();
    const values = new Map();
    res.render('request.njk', {errorMessages: errorMessages, values: values});
});


app.post('/decide/private-beta/request-form', async (req, res) => {
    const values = new Map<string, string>(Object.entries(req.body));
    values.forEach((value, key) => values.set(key, value.trim()));

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("department-name", "Enter your department");

    const validator = new Validation(values, requiredFields);
    await validator.loadExtendedEmailDomains();
    const errorMessages = validator.validate();

    if (errorMessages.size == 0) {
        values.set('id', uuid());
        values.set('submission-date', getTimestamp());

        let redirectTo = '/decide/private-beta/request-submitted'

        let sheetsService: SheetsService = new SheetsService(process.env.REQUEST_SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => redirectTo = '/register-error');
        await sheetsService.appendValues(
            values,
            process.env.REQUEST_SHEET_DATA_RANGE as string,
            process.env.REQUEST_SHEET_HEADER_RANGE as string)
            .then(() => console.log("Saved to sheets"))
            .catch(reason => {
                console.log(reason)
                redirectTo = '/register-error'
            });
        res.redirect(redirectTo);
    } else {
        res.render('request.njk',
            {
                errorMessages: errorMessages,
                values: values,
                fieldOrder:
                    [
                        "name",
                        "email",
                        "department-name",
                        "service-name"
                    ]
            });
    }
});

app.post('/contact-us', async (req, res) => {
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
});

app.get('/contact-us-submitted', (req, res) => {
    res.render('under-construction.njk');
});

app.get('/contact-us-details', (req, res) => {
    res.render('contact-us-details.njk');
});

app.get('/support', (req, res) => {
    res.render('support.njk');
});

app.post('/support', async (req, res) => {
    if (req.body && Object.keys(req.body).length === 0) {
        res.render('support.njk', {valueNotSelected: true});
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
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running; listening on port ${port}`));
