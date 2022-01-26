import {Given, When} from "@cucumber/cucumber";

When('they select the {string} button', async function (id) {
    await Promise.all([
        this.page.waitForNavigation(),
        this.page.click(`#${id}`)
    ])
});

When('the user selects the {string} radio button', async function (labelText) {
    let el = await this.page.$x(`//label[contains(text(), "${labelText}")]`);
    await el[0].click();
});
