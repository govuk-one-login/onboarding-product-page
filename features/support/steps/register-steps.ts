import { Given } from '@cucumber/cucumber';

Given('that the users enter alphanumeric characters into all of the fields', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#service-name', 'Unicorn Testing');
    await this.page.click('#mailing-list-yes');

});

Given('that the users enter alphanumeric characters into all of the fields in the register form except the Name field', async function () {
    await this.goToPath('/register');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#service-name', 'Unicorn Testing');
    await this.page.click('#mailing-list-yes');
});

Given('that the users enter alphanumeric characters into all of the fields in the register form except the Organisation name field', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#service-name', 'Unicorn Testing');
    await this.page.click('#mailing-list-yes');
});

Given('that the users enter alphanumeric characters into all of the fields in the register form except the Contact email field', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#service-name', 'Unicorn Testing');
    await this.page.click('#mailing-list-yes');
});

Given('that the users enter alphanumeric characters into all of the fields in the register form except the Service name field', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.click('#mailing-list-yes');
});

Given('that the user enters an invalid email address into the email field', async function () {
    await this.goToPath('/register');
    await this.page.type('#email', '1 Station Road, Newtown, Countyshire AB1 2CD');
});

Given('that the user enters a non-government email address into the email field', async function () {
    await this.goToPath('/register');
    await this.page.type('#email', 'bill@microsoft.com');
});

Given('that the users enter alphanumeric characters into all of the fields in the register form except the mailing-list radio', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#service-name', 'Unicorn Testing');
});

Given('that the users enter alphanumeric characters into all of the fields in the register form and select no for the mailing list', async function () {
    await this.goToPath('/register');
    await this.page.type('#name', 'Tessa Ting');
    await this.page.type('#organisation-name', 'Department of Sorcery');
    await this.page.type('#email', 'tessa.ting@foo-bar.gov.uk');
    await this.page.type('#service-name', 'Unicorn Testing');
    await this.page.click('#mailing-list-no');
});
