import express from 'express';
import configureViews from './lib/configureViews';

const app = express();

app.use(express.static('./dist'));

configureViews(app);

app.get('/', (req,res) => {
    res.render('index.njk');
});

app.listen(3000, () => console.log('Server running'));

