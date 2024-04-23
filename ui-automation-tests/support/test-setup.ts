// eslint-disable-next-line @typescript-eslint/no-var-requires
import {After, AfterAll, Before, BeforeAll, setWorldConstructor, World} from "@cucumber/cucumber";
import {IWorldOptions} from "@cucumber/cucumber/lib/support_code_library_builder/world";
import puppeteer, {Browser, Page} from "puppeteer";

let browser: Browser;

export class TestContext extends World {
    private browserPage: Page | undefined;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async goToPath(path: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.page?.goto(new URL(path, this.host).toString());
    }

    get page(): Page {
        if (!this.browserPage) {
            throw new Error("Browser page is not present");
        }

        return this.browserPage;
    }

    set page(page: Page) {
        this.browserPage = page;
    }
}

BeforeAll(async function () {
    console.log(`Running tests against ${process.env.HOST || "local"}`);
    browser = await puppeteer.launch({headless: !process.env.SHOW_BROWSER});
});

Before(async function () {
    this.host = (process.env.HOST as string) || "http://localhost:3000";
    this.page = await browser.newPage();
});

After(async function () {
    if (!process.env.SHOW_BROWSER) {
        await this.page.close();
    }
});

AfterAll(async function () {
    if (!process.env.SHOW_BROWSER) {
        await browser.close();
    }
});

setWorldConstructor(TestContext);
