import {When} from "@cucumber/cucumber";

When("they select the {string} button", async function (id) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(`#${id}`)]);
});

When("the user selects the {string} radio button", async function (labelText) {
    const el = await this.page.$$(`::-p-xpath(//label[contains(text(), "${labelText}")])`);
    await el[0].click();
});
