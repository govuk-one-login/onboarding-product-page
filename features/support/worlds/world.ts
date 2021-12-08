const { setWorldConstructor } = require("@cucumber/cucumber");

export default class CustomWorld {
    private variable: number;
    constructor() {
        this.variable = 0;
    }

    setTo(number: number) {
        this.variable = number;
    }

    incrementBy(number: number) {
        this.variable += number;
    }
}

setWorldConstructor(CustomWorld);
