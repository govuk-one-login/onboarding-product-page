import {When, Then} from "@cucumber/cucumber";
import {Page} from "puppeteer";
import {enterTextIntoTextInput, checkErrorMessageDisplayedForField, clickSubmitButton} from "./shared-functions";

const fields = {
    "first name": "firstName",
    "last name": "lastName",
    email: "email",
    role: "role",
    "organisation name": "organisationName",
    "organisation type": "organisationType",
    "service name": "serviceName",
    "service description": "serviceDescription",
    "approximate number of users each year": "expectedNumberOfUsersPerAnnum",
    "estimated date for your service to go live": "estimatedServiceGoLiveDate",
    "what would you like to access and test": "accessAndTest",
    "any other services you would like to talk to us about": "anyOtherServicesToTalkAbout",
    "would you like to get updates": "getUpdatesAboutOneLogin"
};

When("they submit the {} {string}", async function (fieldName, value) {
    await enterTextIntoTextInput(this.page, value, fields[fieldName as keyof typeof fields]);
    await clickSubmitButton(this.page);
});

When("they try to submit the form without selecting any value from the radio button", async function () {
    await clickSubmitButton(this.page);
});

When("they try to submit the form without selecting any value from the checkbox list", async function () {
    await clickSubmitButton(this.page);
});

Then("the error message with the text {string} must be displayed for the {} field", async function (errorMessage, fieldName) {
    const errorLink = await this.page.$x(`//div[@class="govuk-error-summary"]//a[@href="#${fields[fieldName as keyof typeof fields]}"]`);
    await checkErrorMessageDisplayedForField(this.page, errorLink, errorMessage, fields[fieldName as keyof typeof fields]);
});

async function selectOption(page: Page, option: string, value: string) {
    const radio = await page.$x(`//div[@id="${option}-options"]//input[@value="${value}"]`);
    await radio[0].click();
}

When("they fill in correct data in all the mandatory input fields, select buttons, and check lists", async function () {
    await this.page.type("#firstName", "Testfirstname");
    await this.page.type("#lastName", "Testlastname");
    await this.page.type("#email", "test@gov.uk");
    await this.page.type("#role", "Test role");
    await this.page.type("#organisationName", "Test organisation");
    await selectOption(this.page, "organisationType", "governmentDepartmentOrMinistry");
    await this.page.type("#serviceName", "Test Service");
    await this.page.type("#serviceDescription", "Test Service description");
    await selectOption(this.page, "expectedNumberOfUsersPerAnnum", "1000");
    await this.page.type("#estimatedServiceGoLiveDate", "June 2025");
    await selectOption(this.page, "accessAndTest", "authenticationOnly");
    await selectOption(this.page, "anyOtherServicesToTalkAbout", "yes");
    await selectOption(this.page, "getUpdatesAboutOneLogin", "YES");
});
