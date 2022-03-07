import {Then} from "@cucumber/cucumber";
import {strict as assert} from "assert";
import {Page} from "puppeteer";

Then('the left-hand navigation menu is displayed', async function () {
    let home = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/decide" and contains(text(), "Home")]`);
    assertElementFound(home, "home");
    let timescales = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/decide/timescales" and contains(text(), "Timescales")]`);
    assertElementFound(timescales, "timescales");
    let userJourneys = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/decide/user-journeys" and contains(text(), "User journeys")]`);
    assertElementFound(userJourneys, "User journeys");
    let designPatterns = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/decide/design-patterns" and contains(text(), "Design patterns")]`);
    assertElementFound(designPatterns, "Design patterns");
    let techDocs = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="https://docs.sign-in.service.gov.uk/#gov-uk-sign-in" and contains(text(), "Technical documentation")]`);
    assertElementFound(techDocs, "Technical documentation");
    let requestToJoin = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/decide/private-beta" and contains(text(), "Request to join private beta")]`);
    assertElementFound(requestToJoin, "Request to join private beta");
});

function assertElementFound(element: any, description: string): void {
    assert.equal(element.length, 1, `Couldn't find ${description} link in menu`);
}

Then('the {string} link is the active item', async function (item: string) {
    await assertElementIsActiveItem(this.page, item);
});

async function assertElementIsActiveItem(page: Page, item: string) {
    let element = await page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//li[contains(@class, "sub-navigation__item--active")]//a[contains(text(), "${item}")]`);
    assert.equal(element.length, 1, `${item} was not the active element`);
}
