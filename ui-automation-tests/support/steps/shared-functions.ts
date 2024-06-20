import {strict as assert} from "assert";
import {ElementHandle, Page} from "puppeteer";

const defaultTimeout = 5000;
// eslint-disable-next-line
export async function getLink(page: Page, linkText: string): Promise<any> {
    const links = await page.$$(`::-p-xpath(//a[text()="${linkText}"])`);
    assert.equal(links.length, 1, `More than one link matched ${linkText}`);
    return links;
}

export async function checkUrl(page: Page, links: ElementHandle[], expectedUrl: string): Promise<void> {
    assert.equal(
        // eslint-disable-next-line
        await page.evaluate((anchor: {getAttribute: (arg0: string) => any}) => anchor.getAttribute("href"), links[0]),
        expectedUrl
    );
}

export async function enterTextIntoTextInput(page: Page, text: string, inputId: string) {
    const inputElement = await page.$(`#${inputId}`);
    if (!inputElement) {
        throw new Error(`Could not find element with id ${inputId}`);
    }

    await inputElement.click({clickCount: 3});
    await inputElement.press("Backspace");
    await page.type(`#${inputId}`, text);
}

export async function clickButtonWithId(page: Page, id: string, timeout = defaultTimeout) {
    await Promise.all([page.waitForNavigation({timeout: timeout}), page.click(`#${id}`)]);
}

export async function clickSubmitButton(page: Page, timeout = defaultTimeout) {
    await clickButtonWithId(page, "submit", timeout);
}

export async function checkErrorMessageDisplayedForField(page: Page, errorLink: ElementHandle[], errorMessage: string, field: string) {
    assert.notEqual(errorLink.length, 0, `Expected to find the message ${errorMessage} in the error summary.`);

    const messageInSummary = await page.evaluate(element => element.textContent, errorLink[0]);
    assert.equal(messageInSummary, errorMessage, `Expected text of the link to be ${errorMessage}`);

    const messagesAboveElement = await page.$$(`::-p-xpath(//p[@class="govuk-error-message"][@id="${field}-error"])`);
    assert.notEqual(messagesAboveElement.length, 0, `Expected to find the message ${errorMessage} above the ${field} field.`);

    const messageAboveElement = await page.evaluate(element => element.textContent, messagesAboveElement[0]);
    assert.equal(
        messageAboveElement?.trim(),
        "Error: " + errorMessage,
        `Expected the message above the ${field} field to be ${errorMessage}`
    );
}
