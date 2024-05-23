import {submitForm} from "../../src/controllers/contact-us";
import {redirectSpy, renderSpy, request, response} from "../mocks";
import {expect} from "chai";

function setRequestBody(name: string, email: string, role: string, organisationName: string, serviceName: string, howCanWeHelp: string): any  {
    return {
        name:                   name,
        email:                  email,
        role:                   role,
        "organisation-name":    organisationName,
        "service-name":         serviceName,
        "how-can-we-help":      howCanWeHelp
    }
}

describe("contact-us Controller Tests", () => {
    const mockRequest = request({
        // These Properties should cause a Test failure because Email is not in correct Format - Once Test proved, need to set Email correctly
        body:   setRequestBody('My Name', 'My Email', 'My Role', 'My Org', 'My Service', 'I need Help!')
    });

    const mockResponse = response();

    it("calls submitForm with all required fields and redirects to /contact-us-submitted", async() => {
        await submitForm(mockRequest, mockResponse);
        console.log(JSON.stringify(renderSpy));
        console.log(JSON.stringify(redirectSpy));
        expect(redirectSpy.calledWith("contact-us-submitted"));
    })
})
