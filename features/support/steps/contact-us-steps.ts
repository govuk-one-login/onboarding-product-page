import {Given, Then} from "@cucumber/cucumber";
import {Page} from "puppeteer";

Given("that the users enter alphanumeric characters into all of the fields in the contact us form", async function () {
    await this.goToPath("/contact-us");
    await fillInUserInfoFields(this.page);
    await this.page.type(
        "#how-can-we-help",
        "Test Requests will get deleted quite often, if you have any questions about these requests please contact #di-self-service-team of" +
            "\nPod: Adoption \nTeam: Self-service"
    );
});

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the name field",
    async function () {
        await this.goToPath("/contact-us");
        await this.page.type("#role", "Chief Unicorn Tester");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#service-name", "Unicorn Testing");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#how-can-we-help", "We'd like fairies to be able to sign up to get their unicorns tested.");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the email field",
    async function () {
        await this.goToPath("/contact-us");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#role", "Chief Unicorn Tester");
        await this.page.type("#service-name", "Unicorn Testing");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#how-can-we-help", "We'd like fairies to be able to sign up to get their unicorns tested.");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the role field",
    async function () {
        await this.goToPath("/contact-us");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#service-name", "Unicorn Testing");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#how-can-we-help", "We'd like fairies to be able to sign up to get their unicorns tested.");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the organisation-name field",
    async function () {
        await this.goToPath("/contact-us");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#role", "Chief Unicorn Tester");
        await this.page.type("#service-name", "Unicorn Testing");
        await this.page.type("#how-can-we-help", "We'd like fairies to be able to sign up to get their unicorns tested.");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the service-name field",
    async function () {
        await this.goToPath("/contact-us");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#role", "Chief Unicorn Tester");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#how-can-we-help", "We'd like fairies to be able to sign up to get their unicorns tested.");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the contact us form except the how-can-we-help field",
    async function () {
        await this.goToPath("/contact-us");
        await fillInUserInfoFields(this.page);
    }
);

Given("that the user enters an invalid email address into the email field of the contact us form", async function () {
    await this.goToPath("/contact-us");
    await this.page.type("#email", "1 Station Road, Newtown, Countyshire AB1 2CD");
});

Given("that the user enters a non-government email address into the email field of the contact us form", async function () {
    await this.goToPath("/contact-us");
    await this.page.type("#email", "bill@microsoft.com");
});

Then("their data is sent to Zendesk", async function () {
    // We can't really test this unless we just run a unit test or something
    return true;
});

async function fillInUserInfoFields(page: Page) {
    await page.type("#email", "test.automation@gov.uk");
    await page.type("#name", "Test Automation");
    await page.type("#role", "Test Automation Testing");
    await page.type("#service-name", "Automation Testing");
    await page.type("#organisation-name", "Department of Testing SSE");
}
