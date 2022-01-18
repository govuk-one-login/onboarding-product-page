import {assert} from 'chai'

import Validation from './index'

describe('Validation tests', function () {

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("role", "Enter your role");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("department-name", "Enter your organisation");
    requiredFields.set("phase", "Select the phase you are in");
    requiredFields.set("assessment", "Select yes if you have passed the relevant GDS service assessment");
    requiredFields.set("host", "Select yes if your service is on GOV.UK");
    requiredFields.set("development", "Select yes if you have a development team");
    requiredFields.set("auth-need", "Select yes if your service needs authentication");
    requiredFields.set("auth-exist", "Select yes if you already have an authentication solution");
    requiredFields.set("id-need", "Select yes if you have identity needs");

    let requiredConditionalFields = new Map<string, Map<string, string>>();
    requiredConditionalFields.set("auth-exist", new Map([["auth-existing", "Enter the name of your authentication solution"]]));
    requiredConditionalFields.set("id-need", new Map([["id-needs", "You must describe your identity needs"]]));


    it("doesn't return any errors for a valid form", function () {
        assert.equal(new Validation(completedValidForm(), requiredFields, requiredConditionalFields).validate().size, 0);
    });

    it('returns 12 errors if the form is empty', function () {
        assert.equal(new Validation(new Map<string, string>(), requiredFields, requiredConditionalFields).validate().size, 12, 'expected to see 12 errors');
    });

    it('does not accept foo@bar.com as a valid email address because it is not a government address', function () {
        let emailError = new Validation(new Map<string, string>(Object.entries({email: "foo@bar.com"})), requiredFields, requiredConditionalFields).validate().get("email")
        assert.equal(emailError,
            "You must enter a government email address",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it('does not accept foo@bar as a valid email address because the domain is incomplete', function () {
        let emailError = new Validation(new Map<string, string>(Object.entries({email: "foo@bar"})), requiredFields, requiredConditionalFields).validate().get("email")
        assert.equal(emailError,
            "Enter an email address in the correct format, like name@gov.uk",
            "There are three possible error conditions for the email field - empty, invalid, not a government email.");
    });

    it("returns an error if you have an authentication solution but you don't name it", function () {
        let form = completedValidForm();
        form.set('auth-exist', 'yes');
        assert.equal(new Validation(form, requiredFields, requiredConditionalFields).validate().get("auth-existing"),
            "Enter the name of your authentication solution",
            'If auth-exist is yes, auth-existing must contain a value');
    });

    it("it does not return error if you have an authentication solution and you name it", function () {
        let form = completedValidForm();
        form.set('auth-exist', 'yes');
        form.set('auth-existing', 'Verify lol');
        let errors = new Validation(form, requiredFields, requiredConditionalFields).validate();
        assert.isUndefined(new Validation(form, requiredFields, requiredConditionalFields).validate().get("auth-existing"),
            'If auth-exist is yes, auth-existing must contain a value');
    });

    it("returns an error if you have authentication needs but you don't explain them", function () {
        let form = completedValidForm();
        form.set('id-need', 'yes');
        assert.equal(new Validation(form, requiredFields, requiredConditionalFields).validate().get("id-needs"),
            "You must describe your identity needs",
            'If id-need is yes, id-needs must contain a value');
    });

    it("it does not return error if you have an authentication solution and you name it", function () {
        let form = completedValidForm();
        form.set('id-need', 'yes');
        form.set('id-needs', 'OAuth2 would be totes awesome');
        assert.isUndefined(new Validation(form, requiredFields, requiredConditionalFields).validate().get("id-needs"),
            'If id-need is yes, id-needs must contain a value');
    });

    it('it accepts bl.uk as a valid email domain', async function() {
        let form = completedValidForm();
        form.set('email', "bookworm@bl.uk")
        let validator = new Validation(form, requiredFields, requiredConditionalFields);
        await validator.loadExtendedEmailDomains();
        assert.equal(validator.validate().size, 0, "bl.uk is one of the domains in valid-email-domains.txt");
    })
})

function completedValidForm(): Map<string, string> {
    return new Map<string, string>(Object.entries({
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
    }));
}
