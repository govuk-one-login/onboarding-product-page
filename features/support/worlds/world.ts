import puppeteer, {Browser} from "puppeteer";

const { setWorldConstructor } = require("@cucumber/cucumber");

export default class CustomWorld {
    private variable: number;
    private browser: Browser | undefined;
    constructor() {
        this.variable = 0;
        this.initBrowser().then(browser => this.browser = browser);
    }

    async initBrowser(): Promise<Browser> {
        return await puppeteer.launch({headless: false});
    }

    setTo(number: number) {
        this.variable = number;
    }

    incrementBy(number: number) {
        this.variable += number;
    }
}

setWorldConstructor(CustomWorld);
