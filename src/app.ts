import express, {NextFunction, Request, Response } from 'express';
import configureViews from './lib/configureViews';

import register from './routes/register'
import decide from './routes/decide'
import contactUs from './routes/contact-us'
import site from "./routes/site";
import support from './routes/support'

const app = express();
const bodyParser = require('body-parser')

app.use('/dist', express.static('./dist/assets'));
app.use(express.static('./dist'));

app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
configureViews(app);

app.use('/', register);
app.use('/', contactUs);
app.use('/', site);
app.use('/decide', decide);
app.use('/', support);
app.locals.googleTagId = process.env.GOOGLE_TAG_ID;

//This middleware function should always be at the very bottom of the stack (below all other functions related to routing).
app.use((req, res, next) => {
    res.status(404).render('404.njk');
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500)
    res.render('there-is-a-problem.njk', { showLinkToContactForm: (req.path !== '/contact-us') });
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running; listening on port ${port}`));
