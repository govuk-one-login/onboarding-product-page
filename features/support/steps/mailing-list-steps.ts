import {Given, Then} from "@cucumber/cucumber";

Given('that the users enter alphanumeric characters into all of the fields in the mailing list form', async function () {
  await this.goToPath("/mailing-list");
  await this.page.type("#personalName", 'Tessa Ting');
  await this.page.type('#organisationName', 'Department of Sorcery');
  await this.page.type("#contactEmail", 'tessa.ting@foo-bar.gov.uk');
  await this.page.type("#serviceName", 'Unicorn Testing');
});
