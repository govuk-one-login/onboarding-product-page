import {Given, Then} from "@cucumber/cucumber";
import {strict as assert} from "assert";

Given("the user wants to contact the service", async function () {
    // just here for the story to read better
});

Then("they would be able to send an email to the service if they selected the {string} link", async function (text: string) {
    const links = await this.page.$$(`::-p-xpath(//a[text()="${text}")])`);
    assert.equal(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await this.page.evaluate((anchor: {getAttribute: (arg0: string) => any}) => anchor.getAttribute("href"), links[0]),
        `mailto:${text}`
    );
});
