import request from "supertest";
import chai from "chai";
import express from "express";
import {confirm, error, get, post} from "../../src/controllers/register";
import bodyParser from "body-parser";
import sinon from "sinon";
import configureViews from "../../src/config/configureViews";
import Validation from "../../src/lib/validation/validation";
import SheetsService from "../../src/lib/sheets/SheetsService";
import JiraTicketService from "../../src/lib/jira/JiraTicketService";

const {expect} = chai;
const app = express();

configureViews(app);
app.get("/register-confirm", confirm);
app.get("/register-error", error);
app.get("/register", get);
app.post("/register", bodyParser.urlencoded({extended: false}), bodyParser.json(), post);

describe("GET /register-confirm", () => {
    it("should render the register-confirm.njk template", done => {
        request(app).get("/register-confirm").expect("Content-Type", /html/).expect(200, done);
    });
});

describe("GET /register-error", () => {
    it("should render the register-error.njk template", done => {
        request(app).get("/register-error").expect("Content-Type", /html/).expect(200, done);
    });
});

describe("GET /register", () => {
    it("should render the register.njk template", done => {
        request(app).get("/register").expect("Content-Type", /html/).expect(200, done);
    });
});

describe("POST /register", () => {
    let validateStub: sinon.SinonStub;
    let initStub: sinon.SinonStub;
    let appendValuesStub: sinon.SinonStub;
    let sendJiraTicketStub: sinon.SinonStub;

    beforeEach(() => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "true";
        process.env.JIRA_INTEGRATION_ENABLED = "true";
        process.env.REGISTER_SPREADSHEET_ID = "testSpreadsheetId";
        process.env.REGISTER_SHEET_DATA_RANGE = "testDataRange";
        process.env.REGISTER_SHEET_HEADER_RANGE = "testHeaderRange";

        validateStub = sinon.stub(Validation.prototype, "validate").returns(new Map());
        initStub = sinon.stub(SheetsService.prototype, "init").resolves();
        appendValuesStub = sinon.stub(SheetsService.prototype, "appendValues").resolves();
        sendJiraTicketStub = sinon.stub(JiraTicketService.prototype, "sendJiraTicket").resolves();

        app.set("validation", new Validation());
    });

    afterEach(() => {
        validateStub.restore();
        initStub.restore();
        appendValuesStub.restore();
        sendJiraTicketStub.restore();
    });

    it("should redirect to /register-confirm when valid data is posted and all integrations are successful", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "true";
        process.env.JIRA_INTEGRATION_ENABLED = "true";

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Developer",
                organisationName: "Gov",
                organisationType: "governmentDepartment",
                serviceName: "Test Service",
                serviceDescription: "Test Service Description",
                expectedNumberOfUsersPerAnnum: "1000",
                estimatedServiceGoLiveDate: "2023-12",
                accessAndTest: "authenticationOnly",
                anyOtherServicesToTalkAbout: "no",
                getUpdatesAboutOneLogin: "yes"
            })
            .expect("Location", "/register-confirm")
            .expect(302, done);
    });

    it("should not call SheetsService and JiraTicketService when integrations are disabled", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "false";
        process.env.JIRA_INTEGRATION_ENABLED = "false";

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Manager",
                organisationName: "Gov",
                organisationType: "executiveAgency",
                serviceName: "Another Test Service",
                serviceDescription: "Another Test Service Description",
                expectedNumberOfUsersPerAnnum: "500",
                estimatedServiceGoLiveDate: "2023-11",
                accessAndTest: "authAndIdentity",
                anyOtherServicesToTalkAbout: "yes",
                getUpdatesAboutOneLogin: "no"
            })
            .expect("Location", "/register-confirm")
            .expect(302)
            .end(err => {
                if (err) return done(err);
                sinon.assert.notCalled(initStub);
                sinon.assert.notCalled(appendValuesStub);
                sinon.assert.notCalled(sendJiraTicketStub);
                done();
            });
    });

    it("should redirect to /register-error when SheetsService.init fails", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "true";
        initStub.rejects(new Error("Init failed"));

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Analyst",
                organisationName: "Gov",
                organisationType: "armsLengthBody",
                serviceName: "Third Test Service",
                serviceDescription: "Third Test Service Description",
                expectedNumberOfUsersPerAnnum: "2000",
                estimatedServiceGoLiveDate: "2024-01",
                accessAndTest: "authAndIdentity",
                anyOtherServicesToTalkAbout: "yes",
                getUpdatesAboutOneLogin: "no"
            })
            .expect("Location", "/register-error")
            .expect(302, done);
    });

    it("should redirect to /register-error when SheetsService.appendValues fails", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "true";
        appendValuesStub.rejects(new Error("Append values failed"));

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Analyst",
                organisationName: "Gov",
                organisationType: "armsLengthBody",
                serviceName: "Third Test Service",
                serviceDescription: "Third Test Service Description",
                expectedNumberOfUsersPerAnnum: "2000",
                estimatedServiceGoLiveDate: "2024-01",
                accessAndTest: "authAndIdentity",
                anyOtherServicesToTalkAbout: "yes",
                getUpdatesAboutOneLogin: "no"
            })
            .expect("Location", "/register-error")
            .expect(302, done);
    });

    it("should redirect to /register-error when JiraTicketService.sendJiraTicket fails with a standard error", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "false";
        process.env.JIRA_INTEGRATION_ENABLED = "true";
        sendJiraTicketStub.rejects(new Error("Jira ticket creation failed"));

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Analyst",
                organisationName: "Gov",
                organisationType: "armsLengthBody",
                serviceName: "Third Test Service",
                serviceDescription: "Third Test Service Description",
                expectedNumberOfUsersPerAnnum: "2000",
                estimatedServiceGoLiveDate: "2024-01",
                accessAndTest: "authAndIdentity",
                anyOtherServicesToTalkAbout: "yes",
                getUpdatesAboutOneLogin: "no"
            })
            .expect("Location", "/register-error")
            .expect(302, done);
    });

    it("should redirect to /register-error when JiraTicketService.sendJiraTicket fails with an Axios error", done => {
        process.env.GOOGLE_SHEETS_INTEGRATION_ENABLED = "false";
        process.env.JIRA_INTEGRATION_ENABLED = "true";

        const axiosError = {
            isAxiosError: true,
            status: 500,
            response: {
                data: {
                    errorMessages: ["Error message"],
                    errors: {field: "Error detail"}
                }
            }
        };

        sendJiraTicketStub.rejects(axiosError);

        request(app)
            .post("/register")
            .send({
                firstName: "TestFirst",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Analyst",
                organisationName: "Gov",
                organisationType: "armsLengthBody",
                serviceName: "Third Test Service",
                serviceDescription: "Third Test Service Description",
                expectedNumberOfUsersPerAnnum: "2000",
                estimatedServiceGoLiveDate: "2024-01",
                accessAndTest: "authAndIdentity",
                anyOtherServicesToTalkAbout: "yes",
                getUpdatesAboutOneLogin: "no"
            })
            .expect("Location", "/register-error")
            .expect(302, done);
    });

    it("should render the register.njk template with error messages when invalid data is posted", done => {
        validateStub.returns(new Map([["firstName", "Enter your first name"]]));

        request(app)
            .post("/register")
            .send({
                firstName: "",
                lastName: "TestLast",
                email: "test@test.com",
                role: "Developer",
                organisationName: "Gov",
                organisationType: "governmentDepartmentOrMinistry",
                serviceName: "Test Service",
                serviceDescription: "Test Service Description",
                expectedNumberOfUsersPerAnnum: "1000",
                estimatedServiceGoLiveDate: "2023-12",
                accessAndTest: "authenticationOnly",
                anyOtherServicesToTalkAbout: "no",
                getUpdatesAboutOneLogin: "yes"
            })
            .expect("Content-Type", /html/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include("Enter your first name");
                done();
            });
    });
});
