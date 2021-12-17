import puppeteer, {Browser, Page} from "puppeteer";
import {After, Before} from "@cucumber/cucumber";
import {IWorldOptions} from "@cucumber/cucumber/lib/support_code_library_builder/world";

const {setWorldConstructor, World} = require("@cucumber/cucumber");

class OnboardingWorld extends World {
    private host: string | undefined;

    constructor(options: IWorldOptions) {
        super(options)

        if (process.env.HOST as string != undefined) {
            this.host = process.env.HOST
        } else {
            this.host = 'http://localhost:3000'
        }
    }
}

Before(async function () {
    this.puppeteer = await puppeteer.launch({headless: true});
})

After(async function () {
    this.puppeteer.close();
})

setWorldConstructor(OnboardingWorld);

