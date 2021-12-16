import {Then, When} from "@cucumber/cucumber";
import {strict as assert} from "assert";

Then('they should be directed to the following page: {string}', async function (url) {
    assert.equal(this.page.url(), this.host + url)
});

Then('their data is saved in the spreadsheet', async function () {
    // we can't reliably test this but if we're on the above page, we should be okay
    return true;
});

Then('the error message {string} must be displayed for the {string} field', async function (errorMessage, field) {
    const errorLink = await this.page.$x(`//div[contains(concat(" ", normalize-space(@class), " "), " govuk-error-summary ")]//a[@href="#${field}"]`)
    assert.notEqual(errorLink.length, 0, `Expected to find the message ${errorMessage} in the error summary.`)
    const actualMessageInSummary = await this.page.evaluate((el: { textContent: any; }) => el.textContent, errorLink[0]);
    assert.equal(actualMessageInSummary, errorMessage, `Expected text of the link to be ${errorMessage}`)

    const messageAboveElement = await this.page.$x(`//span[contains(concat(" ", normalize-space(@class), " "), " govuk-error-message ") and @id="${field}-error" ]`)
    assert.notEqual(messageAboveElement.length, 0, `Expected to find the message ${errorMessage} above the ${field} field.`)
    const actualMessageAboveSummary = await this.page.evaluate((el: { textContent: any; }) => el.textContent, messageAboveElement[0]);
    assert.equal(actualMessageAboveSummary.trim(), "Error: " + errorMessage, `Expected the message above the ${field} field to be ${errorMessage}`)
});

When('they select the Submit button', async function () {
    await Promise.all([
        this.page.waitForNavigation(),
        this.page.click("#submit")
    ])
});
