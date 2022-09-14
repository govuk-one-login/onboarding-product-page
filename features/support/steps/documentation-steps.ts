import {Then} from "@cucumber/cucumber";
import {strict as assert} from "assert";
import {Page} from "puppeteer";

Then("the left-hand navigation menu is displayed", async function () {
    const technicalDocumentation = await this.page.$x(
        `//nav[@class="side-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation"][text()="Technical documentation"]`
    );
    assertElementFound(technicalDocumentation, "Technical documentation");
    const userJourneyMaps = await this.page.$x(
        `//nav[@class="side-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation/user-journeys"][text()="User journey maps"]`
    );
    assertElementFound(userJourneyMaps, "User journey maps");
    const designRecommendations = await this.page.$x(
        `//nav[@class="side-navigation"]/ul[contains(@class, "govuk-list")]//a[@href="/documentation/design-recommendations"][contains(text(), "Design recommendations")]`
    );
    assertElementFound(designRecommendations, "Design recommendations");
});

function assertElementFound(element: any, description: string): void {
    assert.equal(element.length, 1, `Couldn't find ${description} link in menu`);
}

Then("the {string} link is the active item", async function (item: string) {
    await assertElementIsActiveItem(this.page, item);
});

async function assertElementIsActiveItem(page: Page, item: string) {
    const element = await page.$x(
        `//nav[@class="side-navigation"]/ul[contains(@class, "govuk-list")]//li[contains(@class, "side-navigation__item--active")]//a[contains(text(), "${item}")]`
    );

    assert.equal(element.length, 1, `${item} was not the active element`);
}
