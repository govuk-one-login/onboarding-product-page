import SheetsService from "./sheets/SheetsService";
import express from 'express';
import configureViews from './lib/configureViews';
import Validation from './validation'

import uuid from "./lib/uuid";
import getTimestamp from "./lib/timestamp";
import S3Service from "./s3/S3Service";

const app = express();
const bodyParser = require('body-parser')

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
    const values = new Map(Object.entries(req.body));

    const validator = new Validation(req.body);
    const errorMessages = validator.validate();

    if (errorMessages.size == 0) {
        let form = req.body
        form['id'] = uuid();
        form['submission-date'] = getTimestamp();

        let redirectTo = '/register-confirm'

        let s3service: S3Service = new S3Service(process.env.BUCKET_NAME as string);
        await s3service.init().catch(() => redirectTo = '/resgister-error');
        await s3service.saveToS3(form).catch(() => redirectTo = '/resgister-error');
        console.log("saved to S3");

        let sheetsService: SheetsService = new SheetsService(process.env.SPREADSHEET_ID as string);
        await sheetsService.init().catch(() => redirectTo = '/register-error');
        await sheetsService.appendValues(form, process.env.REGISTER_SHEET_HEADER_RANGE as string)
            .catch(() => redirectTo = '/register-error');
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
                        "role",
                        "email",
                        "additional-contact",
                        "additional-name",
                        "additional-role",
                        "additional-email",
                        "service-name",
                        "department-name",
                        "phase",
                        "user-number",
                        "assessment",
                        "host",
                        "funding",
                        "development",
                        "auth-need",
                        "auth-exist",
                        "auth-existing",
                        "id-need",
                        "id-needs",
                        "updates",
                        "show-and-tell",
                        "user-research"
                    ]
            });
    }
});

app.listen(3000, () => console.log('Server running'));


