import {assert} from 'chai'

import Validation from './index'

describe('Validation tests', function () {

    it("doesn't return any errors for a valid form", function () {
        assert.equal(new Validation(completedValidForm()).validate().size, 0);
    });

    it('returns 12 errors if the form is empty', function () {
        assert.equal(new Validation({}).validate().size, 12, 'expected to see 12 errors');
    });

    it('does not accept foo@bar.com as a valid email address because it is not a government address', function () {
        let emailError = new Validation({email: "foo@bar.com"}).validate().get("email")
        assert.equal(emailError,
            "You must enter a government email address",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it('does not accept foo@bar as a valid email address because the domain is incomplete', function () {
        let emailError = new Validation({email: "foo@bar"}).validate().get("email")
        assert.equal(emailError,
            "Enter an email address in the correct format, like name@gov.uk",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it("returns an error if you have an authentication solution but you don't name it", function () {
        let form = completedValidForm();
        form['auth-exist'] = 'yes';
        assert.equal(new Validation(form).validate().get("auth-existing"),
            "Enter the name of your authentication solution",
            'If auth-exist is yes, auth-existing must contain a value');
    });

    it("it does not return error if you have an authentication solution and you name it", function () {
        let form = completedValidForm();
        form['auth-exist'] = 'yes';
        form['auth-existing'] = 'Verify lol'
        let errors = new Validation(form).validate();
        assert.isUndefined(new Validation(form).validate().get("auth-existing"),
            'If auth-exist is yes, auth-existing must contain a value');
    });

    it("returns an error if you have authentication needs but you don't explain them", function () {
        let form = completedValidForm();
        form['id-need'] = 'yes';
        assert.equal(new Validation(form).validate().get("id-needs"),
            "You must describe your identity needs",
            'If id-need is yes, id-needs must contain a value');
    });

    it("it does not return error if you have an authentication solution and you name it", function () {
        let form = completedValidForm();
        form['id-need'] = 'yes';
        form['id-needs'] = 'OAuth2 would be totes awesome'
        assert.isUndefined(new Validation(form).validate().get("id-needs"),
            'If id-need is yes, id-needs must contain a value');
    });

    it('it accepts bl.uk as a valid email domain', async function() {
        let form = completedValidForm();
        form['email'] = "bookworm@bl.uk"
        let validator = new Validation(form);
        await validator.loadExtendedEmailDomains();
        assert.equal(validator.validate().size, 0, "bl.uk is one of the domains in valid-email-domains.txt");
    })
})

function completedValidForm(): any {
    return {
        email: "testing@one23.gov.uk",
        name: "Tessa Ting",
        role: "Chief Form Tester",
        "service-name": "Testing Service",
        "department-name": "Department of form testing",
        phase: "alpha",
        assessment: "yes",
        host: "yes",
        development: "yes",
        "auth-need": "no",
        "auth-exist": "no",
        "id-need": "no"
        // optional fields not included
    }
}
