import {Then} from "@cucumber/cucumber";
import {strict as assert} from "assert";
import {Page} from "puppeteer";

Then('the left-hand navigation menu is displayed', async function () {
    let technicalDocumentation = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation" and contains(text(), "Technical documentation")]`);
    assertElementFound(technicalDocumentation, "Technical documentation");
    let userJourneyMaps = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation/user-journeys" and contains(text(), "User journey maps")]`);
    assertElementFound(userJourneyMaps, "User journey maps");
    let designRecommendations = await this.page.$x(`//nav[@class="sub-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation/design-recommendations" and contains(text(), "Design recommendations")]`);
    assertElementFound(designRecommendations, "Design recommendations");
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
