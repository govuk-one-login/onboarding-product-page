const emailValidator = require("./email-validator");
import fs from "fs";

export default class Validation {
    validEmailDomains: string[];
    static instance: Validation;

    constructor() {
        this.validEmailDomains = [];
        console.log("Loading list of valid email domains.");
        try {
            const emails = fs.readFileSync("./valid-email-domains.txt", "utf-8");
            this.validEmailDomains = emails.trim().split("\n");
        } catch (error) {
            console.error("List of valid email domains could not be loaded.");
            console.error(error);
            process.kill(process.pid, "SIGTERM");
        }
    }

    validate(form: Map<string, string>, requiredFields: Map<string, string>): Map<string, string> {
        const errors = new Map();

        Array.from(requiredFields.keys()).forEach(field => {
            const message = this.getErrorMessage(field, form, requiredFields);
            if (message) {
                errors.set(field, message);
            }
        });

        return errors;
    }

    getErrorMessage(field: string, form: Map<string, string>, errorMessages: Map<string, string>): string | undefined {
        if (this.fieldHasNoValue(field, form)) {
            const errorMessage = errorMessages.get(field);
            if (!errorMessage) {
                throw `No validation message for field ${field}`;
            }

            return errorMessage;
        }

        if (field === "email") {
            const email = form.get("email") as string;

            if (this.invalidEmailAddress(email)) {
                return "Enter an email address in the correct format, like name@gov.uk";
            }

            if (this.notGovernmentEmail(email)) {
                return "Enter a government email address";
            }
        }
    }

    fieldHasNoValue(field: string, form: Map<string, string>): boolean {
        return form.get(field) == "" || form.get(field) == undefined;
    }

    invalidEmailAddress(email: string): boolean {
        return !emailValidator(email);
    }

    notGovernmentEmail(email: string): boolean {
        const emailDomain = email.trim().split("@")[1];
        return this.validEmailDomains.find(domain => domain == emailDomain) === undefined;
    }

    static getInstance() {
        if (!Validation.instance) {
            Validation.instance = new Validation();
        }

        return Validation.instance;
    }
}
