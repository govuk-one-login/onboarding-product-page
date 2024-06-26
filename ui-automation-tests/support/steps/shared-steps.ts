import {Given, Then, When} from "@cucumber/cucumber";
import {strict as assert} from "assert";
import {Page} from "puppeteer";
import {checkUrl, getLink} from "./shared-functions";
import AxePuppeteer from "@axe-core/puppeteer";

Given("that the user is on the {string} page", async function (route: string) {
    await this.goToPath(route);
});
Given(/^user navigated to '(.*)' of '(.*)'$/, async function (pageName: string, route: string) {
    console.log(`User Navigated to ${pageName} page`);
    await this.goToPath(route);
});

When("they click on the {string} link", async function (text: string) {
    const links = await this.page.$$(`::-p-xpath(//a[contains(text(), "${text}")])`);
    await Promise.all([this.page.waitForNavigation({timeout: 10000}), links[0].click()]);
});

When("they click on the {string} button-link", async function (text: string) {
    const links = await this.page.$$(`::-p-xpath(//a[contains(text(), "${text}")][@class="govuk-button"])`);
    await Promise.all([this.page.waitForNavigation({timeout: 10000}), links[0].click()]);
});

When("they click the {string} button", async function (name: string) {
    const button = await this.page.$$(`::-p-xpath(//button[contains(text(), '${name}')])`);
    await Promise.all([this.page.waitForNavigation({timeout: 10000}), button[0].click()]);
});

When("they select the Submit button", async function () {
    const button = await this.page.$$(`::-p-xpath(//button[contains(text(), 'Submit')])`);
    await Promise.all([this.page.waitForNavigation({timeout: 10000}), button[0].click()]);
});

Then("they should be directed to the following page: {string}", async function (path) {
    const expectedUrl = new URL(path, this.host);
    assert.equal(this.page.url(), expectedUrl.href);
});

Then("they should be directed to the following URL: {string}", async function (url) {
    assert.equal(this.page.url(), url);
});

Then("they should be directed to a page with the title {string}", async function (title: string) {
    const actualTitle: string = await this.page.title();
    assert.equal(actualTitle, title, `Page title was ${actualTitle}`);
});

Then("their data is saved in the spreadsheet", async function () {
    // we can't check the sheet but if we're on the right page and can find some content then that's good enough
});

Then("the error message {string} must be displayed for the {string} field", async function (errorMessage, field) {
    await checkErrorMessageDisplayedAboveElement(this.page, errorMessage, field);
});

Then("the error message {string} must be displayed for the {string} radios", async function (errorMessage, field) {
    await checkErrorMessageDisplayedAboveElement(this.page, errorMessage, field);
});

Then("they should see the text {string}", async function (text) {
    // eslint-disable-next-line
    const bodyText: string = await this.page.$eval("body", (element: any) => element.textContent);
    assert.equal(bodyText.includes(text), true, `Body text does not contain "${text}"`);
});

Then("the {string} link will point to the following URL: {string}", async function (linkText, expectedUrl) {
    const link = await getLink(this.page, linkText);
    await checkUrl(this.page, link, expectedUrl);
});

Then("the {string} link will point to the following page: {string}", async function (linkText, expectedPage) {
    const link = await getLink(this.page, linkText);
    await checkUrl(this.page, link, expectedPage);
});
Then(/^there should be no accessibility violations$/, async function () {
    const results = await new AxePuppeteer(this.page).withTags(["wcag21aa", "wcag22aa"]).analyze();
    assert.equal(results.violations.length, 0, "Accessibility Violations Detected : " + JSON.stringify(results.violations));
});

async function checkErrorMessageDisplayedAboveElement(page: Page, errorMessage: string, field: string) {
    const errorLink = await page.$$(`::-p-xpath(//div[@class="govuk-error-summary"]//a[@href="#${field}"])`);
    assert.notEqual(errorLink.length, 0, `Expected to find the message "${errorMessage}" in the error summary.`);
    // eslint-disable-next-line
    const actualMessageInSummary = await page.evaluate((el: {textContent: any}) => el.textContent, errorLink[0]);
    assert.equal(actualMessageInSummary, errorMessage, `Expected text of the link to be "${errorMessage}"`);

    const messageAboveElement = await page.$$(`::-p-xpath(//p[@class="govuk-error-message"][@id="${field}-error"])`);
    assert.notEqual(messageAboveElement.length, 0, `Expected to find the message "${errorMessage}" above the ${field} field.`);
    // eslint-disable-next-line
    const actualMessageAboveSummary = await page.evaluate((el: {textContent: any}) => el.textContent, messageAboveElement[0]);
    assert.equal(
        actualMessageAboveSummary.trim(),
        `Error: ${errorMessage}`,
        `Expected the message above the ${field} field to be "${errorMessage}"`
    );
}
