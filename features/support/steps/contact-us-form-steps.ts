import {Given, When} from "@cucumber/cucumber";
import { strict as assert } from 'assert'
import puppeteer from "puppeteer";

Given(/^that the users enter alphanumeric characters into all of the fields on the form$/, function() {
    (async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('http://localhost:3000' + '/decide/private-beta/request-form');

        await page.type("#name", 'Tessa Ting');
        await page.type('#email', 'tessa.ting@foo-bar.gov.uk');
        await page.type("#service-name", "Unicorn Testing");
        await page.type("#department-name", "Department of Sorcery");
        await page.click("#submit");
        await page.waitForNavigation();
        assert.equal(page.url(), "http://localhost:3000/decide/private-beta/request-form")
        //await browser.close();
    })();
});

When('they select the Submit button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
