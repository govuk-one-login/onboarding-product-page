import {assert} from "chai";

import Validation from "./index";

let validator: Validation;

before(function () {
    validator = new Validation();
});

describe("Validation tests", function () {
    const requiredFields = new Map<string, string>([
        ["email", "Enter your government email address"],
        ["name", "Enter your name"],
        ["service-name", "Enter the name of your service"],
        ["department-name", "Enter your department"]
    ]);

    it("doesn't return any errors for a valid form", function () {
        assert.equal(validator.validate(completedValidForm(), requiredFields).size, 0);
    });

    it("returns 4 errors if the form is empty", function () {
        assert.equal(validator.validate(new Map<string, string>(), requiredFields).size, 4, "expected to see 4 errors");
    });

    it("does not accept foo@bar.com as a valid email address because it is not a government address", function () {
        const emailError = validator.validate(new Map<string, string>(Object.entries({email: "foo@bar.com"})), requiredFields).get("email");
        assert.equal(
            emailError,
            "Enter a government email address",
            "There are three possible error conditions for the email field - empty, invalid, not a government email."
        );
    });

    it("does not accept foo@bar as a valid email address because the domain is incomplete", function () {
        const emailError = validator.validate(new Map<string, string>(Object.entries({email: "foo@bar"})), requiredFields).get("email");
        assert.equal(
            emailError,
            "Enter an email address in the correct format, like name@gov.uk",
            "There are three possible error conditions for the email field - empty, invalid, not a government email."
        );
    });

    it("does not accept foo@foo.gov.uk as a valid email address because the domain is not valid", function () {
        const emailError = validator.validate(new Map<string, string>(Object.entries({email: "foo@bar"})), requiredFields).get("email");
        assert.equal(
            emailError,
            "Enter an email address in the correct format, like name@gov.uk",
            "There are three possible error conditions for the email field - empty, invalid, not a government email."
        );
    });

    it("it accepts bl.uk as a valid email domain", async function () {
        const form = completedValidForm();
        form.set("email", "bookworm@bl.uk");
        assert.equal(validator.validate(form, requiredFields).size, 0, "bl.uk is one of the domains in valid-email-domains.txt");
    });
});

function completedValidForm(): Map<string, string> {
    return new Map<string, string>(
        Object.entries({
            email: "testing@gov.uk",
            name: "Tessa Ting",
            "service-name": "Testing Service",
            "department-name": "Department of form testing"
            // optional fields not included
        })
    );
}
