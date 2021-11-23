import express from 'express';
import configureViews from './lib/configureViews';
import Validation from './validation'

const app = express();
const bodyParser = require('body-parser')

app.use(express.static('./dist'));

configureViews(app);
app.get('/', (req,res) => {
    res.render('index.njk');
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

app.post('/register', (req, res) => {
    const values = new Map(Object.entries(req.body));

    const validator = new Validation(req.body);
    const errorMessages = validator.validate();

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
});


app.listen(3000, () => console.log('Server running'));

