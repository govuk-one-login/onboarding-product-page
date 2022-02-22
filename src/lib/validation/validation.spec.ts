import {assert} from 'chai'

import Validation from './index'

describe('Validation tests', function () {

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("department-name", "Enter your department");

    it("doesn't return any errors for a valid form", function () {
        assert.equal(new Validation(completedValidForm(), requiredFields).validate().size, 0);
    });

    it('returns 4 errors if the form is empty', function () {
        assert.equal(new Validation(new Map<string, string>(), requiredFields).validate().size, 4, 'expected to see 4 errors');
    });

    it('does not accept foo@bar.com as a valid email address because it is not a government address', function () {
        let emailError = new Validation(new Map<string, string>(Object.entries({email: "foo@bar.com"})), requiredFields).validate().get("email")
        assert.equal(emailError,
            "Enter a government email address",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it('does not accept foo@bar as a valid email address because the domain is incomplete', function () {
        let emailError = new Validation(new Map<string, string>(Object.entries({email: "foo@bar"})), requiredFields).validate().get("email")
        assert.equal(emailError,
            "Enter an email address in the correct format, like name@gov.uk",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it('it accepts bl.uk as a valid email domain', async function() {
        let form = completedValidForm();
        form.set('email', "bookworm@bl.uk")
        let validator = new Validation(form, requiredFields);
        await validator.loadExtendedEmailDomains();
        assert.equal(validator.validate().size, 0, "bl.uk is one of the domains in valid-email-domains.txt");
    })
})

function completedValidForm(): Map<string, string> {
    return new Map<string, string>(Object.entries({
        email: "testing@one23.gov.uk",
        name: "Tessa Ting",
        "service-name": "Testing Service",
        "department-name": "Department of form testing",
        // optional fields not included
    }));
}
