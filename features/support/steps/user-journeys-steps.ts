import { Given, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';

Given('the user wants to contact the service', async function () {
    // just here for the story to read better
});

Then('they would be able to send an email to the service if they selected the {string} link', async function (text: string) {
    let links = await this.page.$x(`//a[text()="${text}")]`);
    assert.equal(await this.page.evaluate((anchor: { getAttribute: (arg0: string) => any; }) => anchor.getAttribute('href'), links[0]), `mailto:${text}`);
});
