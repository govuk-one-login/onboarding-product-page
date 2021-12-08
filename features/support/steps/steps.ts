import { Given, When, Then } from '@cucumber/cucumber'
import { strict as assert } from 'assert'

Given("a variable set to {int}", function (number) {
    this.setTo(number);
});

When("I increment the variable by {int}", function (number) {
    this.incrementBy(number);
});

Then("the variable should contain {int}", function (number) {
    assert.equal(this.variable, number);
});
