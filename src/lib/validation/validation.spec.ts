import {assert} from 'chai'

import Validation from './index'

let validator: Validation;

before(function () {
    validator = new Validation();
})

describe('Validation tests', function () {

    let requiredFields = new Map<string, string>();
    requiredFields.set("email", "Enter your government email address");
    requiredFields.set("name", "Enter your name");
    requiredFields.set("service-name", "Enter the name of your service");
    requiredFields.set("department-name", "Enter your department");

    it("doesn't return any errors for a valid form", function () {
        validator.validate(completedValidForm(), requiredFields).then(
            errors =>
                assert.equal(errors.size, 0)
        )
    });

    it('returns 4 errors if the form is empty', function () {
        validator.validate(new Map<string, string>(), requiredFields).then(
            errors =>
                assert.equal(errors.size, 4, 'expected to see 4 errors')
        )

    });

    it('does not accept foo@bar.com as a valid email address because it is not a government address', function () {
        validator.validate(new Map<string, string>(Object.entries({email: "foo@bar.com"})), requiredFields).then(
            errors =>
                assert.equal(errors.get("email"),
                    "Enter a government email address",
                    "There are three possible error conditions for the email field - empty, invalid, not a government email.")
        );
    });

    it('does not accept foo@bar as a valid email address because the domain is incomplete', function () {
        validator.validate(new Map<string, string>(Object.entries({email: "foo@bar"})), requiredFields).then(
            errors =>

                assert.equal(errors.get("email"),
                    "Enter an email address in the correct format, like name@gov.uk",
                    "There are three possible error conditions for the email field - empty, invalid, not a government email.")
        );
    });

    it('it accepts bl.uk as a valid email domain', async function () {
        let form = completedValidForm();
        form.set('email', "bookworm@bl.uk")
        validator.validate(form, requiredFields).then(
            errors =>
                assert.equal(errors.size, 0, "bl.uk is one of the domains in valid-email-domains.txt")
        )
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


// https://www.chaijs.com/
// expect(foo).to.be.a('string');
// expect(foo).to.equal('bar');
// expect(foo).to.have.lengthOf(3);
// expect(tea).to.have.property('flavors')
//   .with.lengthOf(3);
// expect(mySpy).to.have.been.calledWith("foo");
// spy.should.have.been.calledImmediatelyBefore(spy2)
// https://levelup.gitconnected.com/common-gotcha-with-promises-693a993568c2