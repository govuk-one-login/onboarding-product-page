import { Given } from '@cucumber/cucumber';

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#personalName', 'Tessa Ting');
    await this.page.type('#organisationName', 'Department of Sorcery');
    await this.page.type('#contactEmail', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#serviceName', 'Unicorn Testing');
});

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form except the Name field', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#organisationName', 'Department of Sorcery');
    await this.page.type('#contactEmail', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#serviceName', 'Unicorn Testing');
});

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form except the Organisation name field', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#personalName', 'Tessa Ting');
    await this.page.type('#contactEmail', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#serviceName', 'Unicorn Testing');
});

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form except the Contact email field', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#personalName', 'Tessa Ting');
    await this.page.type('#organisationName', 'Department of Sorcery');
    await this.page.type('#serviceName', 'Unicorn Testing');
});

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form except the Service name field', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#personalName', 'Tessa Ting');
    await this.page.type('#organisationName', 'Department of Sorcery');
    await this.page.type('#contactEmail', 'tessa.ting@foo-bar.gov.uk');
});

Given('that the user enters an invalid email address into the email field of join our mailing list form', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#contactEmail', '1 Station Road, Newtown, Countyshire AB1 2CD');
});

Given('that the user enters a non-government email address into the email field of join our mailing list form', async function () {
    await this.goToPath('/mailing-list');
    await this.page.type('#contactEmail', 'bill@microsoft.com');
});
