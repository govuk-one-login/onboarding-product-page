import {Given} from "@cucumber/cucumber";

Given('that the users enter alphanumeric characters into all of the fields in the request access to private beta form', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type("#name", 'Tessa Ting');
    await this.page.type("#service-name", "Unicorn Testing");
    await this.page.type("#department-name", "Department of Sorcery");
});

Given('that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the name field', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type("#service-name", "Unicorn Testing");
    await this.page.type("#department-name", "Department of Sorcery");
});

Given('that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the email field', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type("#name", 'Tessa Ting');
    await this.page.type("#service-name", "Unicorn Testing");
    await this.page.type("#department-name", "Department of Sorcery");
});

Given('that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the department-name field', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type("#name", 'Tessa Ting');
    await this.page.type("#service-name", "Unicorn Testing");
});

Given('that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the service-name field', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type("#name", 'Tessa Ting');
    await this.page.type("#department-name", "Department of Sorcery");
});

Given('that the user enters an invalid email address into the email field of the request access to private beta form', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', '1 Station Road, Newtown, Countyshire AB1 2CD');
});

Given('that the user enters a non-government email address into the email field of the request access to private beta form', async function () {
    await this.goToPath("/decide/private-beta/request-form");
    await this.page.type('#email', 'bill@microsoft.com');
});
