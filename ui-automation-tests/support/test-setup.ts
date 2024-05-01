// eslint-disable-next-line @typescript-eslint/no-var-requires
import {After, AfterAll, Before, BeforeAll, setWorldConstructor, World} from "@cucumber/cucumber";
import {IWorldOptions} from "@cucumber/cucumber/lib/support_code_library_builder/world";
import puppeteer, {Browser, Page} from "puppeteer";
import fse from "fs-extra";
let browser: Browser, counter: number;

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
    counter = 0;
    if (fse.pathExistsSync("output/screenshots")) {
        console.log("Clear screenshots directory ...");
        fse.removeSync("output/screenshots/");
        // recreate directory
        fse.ensureDirSync("output/screenshots");
    } else {
        fse.ensureDirSync("output/screenshots");
    }
    console.log(`Running tests against ${process.env.HOST || "local"}`);
    browser = await puppeteer.launch({headless: !process.env.SHOW_BROWSER});
});

Before(async function () {
    this.host = (process.env.HOST as string) || "http://localhost:3000";
    this.page = await browser.newPage();
});

After(async function (this: TestContext, scenario) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = scenario.result.status;
    const name = scenario.pickle.name.replace(/ /g, "-");
    if (result === "FAILED") {
        counter++;
        const stream = await this.page.screenshot({
            path: `./output/screenshots/${counter}-${result}-[${name}].jpeg`,
            fullPage: true
        });
        return this.attach(stream, "image/jpeg");
    }
});

AfterAll(async function () {
    if (!process.env.SHOW_BROWSER) {
        await browser.close();
    }
});

setWorldConstructor(TestContext);
