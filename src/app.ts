import express from 'express';

const app = express();

app.get('/', (req,res) => {
    res.send('TEST Onboarding product page');
});

app.listen(3000, () => console.log('Server running'));
