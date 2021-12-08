import puppeteer from 'puppeteer';
import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'

Given("a variable set to {int}", function (number) {
    this.setTo(number);
});

When("I increment the variable by {int}", function (number) {
    this.incrementBy(number);
});

Then("the variable should contain {int}", function (number) {
    assert.equal(this.variable, number);
});

Given(/^a url of "([^"]*)"$/, function (url) {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        //await page.pdf({path: 'google.pdf'});
        console.log(await page.content())
        await browser.close();
    })();
})
