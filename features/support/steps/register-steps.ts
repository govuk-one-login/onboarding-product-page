import {Given} from "@cucumber/cucumber";
import {Page} from "puppeteer";

Given("that the users enter alphanumeric characters into all of the fields", async function () {
    await this.goToPath("/register");
    await this.page.type("#name", "Tessa Ting");
    await this.page.type("#organisation-name", "Department of Sorcery");
    await this.page.type("#email", "tessa.ting@gov.uk");
    await this.page.type("#service-name", "Unicorn Testing");
    await selectMailingListOption(this.page, "yes");
});

Given("that the users enter alphanumeric characters into all of the fields in the register form except the Name field", async function () {
    await this.goToPath("/register");
    await this.page.type("#organisation-name", "Department of Sorcery");
    await this.page.type("#email", "tessa.ting@gov.uk");
    await this.page.type("#service-name", "Unicorn Testing");
    await selectMailingListOption(this.page, "yes");
});

Given(
    "that the users enter alphanumeric characters into all of the fields in the register form except the Organisation name field",
    async function () {
        await this.goToPath("/register");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#service-name", "Unicorn Testing");
        await selectMailingListOption(this.page, "yes");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the register form except the Contact email field",
    async function () {
        await this.goToPath("/register");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#service-name", "Unicorn Testing");
        await selectMailingListOption(this.page, "yes");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the register form except the Service name field",
    async function () {
        await this.goToPath("/register");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await selectMailingListOption(this.page, "yes");
    }
);

Given("that the user enters an invalid email address into the email field", async function () {
    await this.goToPath("/register");
    await this.page.type("#email", "1 Station Road, Newtown, Countyshire AB1 2CD");
});

Given("that the user enters a non-government email address into the email field", async function () {
    await this.goToPath("/register");
    await this.page.type("#email", "bill@microsoft.com");
});

Given(
    "that the users enter alphanumeric characters into all of the fields in the register form except the mailing-list radio",
    async function () {
        await this.goToPath("/register");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#service-name", "Unicorn Testing");
    }
);

Given(
    "that the users enter alphanumeric characters into all of the fields in the register form and select no for the mailing list",
    async function () {
        await this.goToPath("/register");
        await this.page.type("#name", "Tessa Ting");
        await this.page.type("#organisation-name", "Department of Sorcery");
        await this.page.type("#email", "tessa.ting@gov.uk");
        await this.page.type("#service-name", "Unicorn Testing");
        await selectMailingListOption(this.page, "no");
    }
);

async function selectMailingListOption(page: Page, value: string) {
    const radio = await page.$x(`//div[@id="mailing-list-options"]//input[@value="${value}"]`);
    await radio[0].click();
}
