import {Given, Then, When} from "@cucumber/cucumber";
import {assert} from "chai";

Given("the user is browsing with a viewport {int} pixels wide", async function (width: number) {
    await this.page.setViewport({height: 400, width: width});
});

When("the user clicks the button with the text {string}", async function (text: string) {
    const button = await this.page.$$(`::-p-xpath(//button[contains(text(), '${text}')])`);
    await button[0].click();
});

Then("they should see a menu item {string} that points to the page {string}", async function (text: string, page: string) {
    const items = await this.page.$$(`::-p-xpath(//li[@class="govuk-header__navigation-item"]/a[text()="${text}"])`);
    assert.equal(items.length, 1, `Could not find ${text} in menu`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const href = await this.page.evaluate((anchor: any) => anchor.getAttribute("href"), items[0]);
    assert.equal(href, page, `Link does not point to ${page} but points to ${href} instead`);
});
