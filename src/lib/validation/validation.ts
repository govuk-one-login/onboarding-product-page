const emailValidator = require('./email-validator');
import fs from 'fs';

export default class Validation {
    validEmailDomains: string[];
    static instance: Validation;

    constructor() {
        this.validEmailDomains = [];
        console.log("Loading list of valid email domains.")
        try {
            let emails = fs.readFileSync("./valid-email-domains.txt", "utf-8")
            this.validEmailDomains = emails.split("\n");
        } catch (error) {
            console.error("List of valid email domains could not be loaded.");
            console.error(error);
            process.kill(process.pid, 'SIGTERM');
        }
    }

    validate(form: Map<string, string>, requiredFields: Map<string, string>): Map<string, string> {
        const errors = new Map();

        requiredFields.forEach((errorMessage, field) => {
            if (this.fieldHasNoValue(field, form)) {
                errors.set(field, errorMessage);
            }
        });

        if (requiredFields.has('email') && !errors.has('email')) {
            if (this.invalidEmailAddress(form)) {
                errors.set('email', 'Enter an email address in the correct format, like name@gov.uk');
            } else if (this.notGovernmentEmail(form)) {
                errors.set('email', 'Enter a government email address');
            }
        }

        return errors;
    }

    fieldHasNoValue(field: string, form: Map<string, string>): boolean {
        return form.get(field) == '' || form.get(field) == undefined;
    }

    invalidEmailAddress(form: Map<string, string>): boolean {
        return !emailValidator(form.get('email'))
    }

    notGovernmentEmail(form: Map<string, string>): boolean {
        // "" will match anything and we get that if there's an empty line at the end of valid-email-domains.txt
        let match = this.validEmailDomains.find(suffix => {
            // @ts-ignore
            return form.get('email').trim().endsWith(suffix) && suffix != "";
        });
        return match == undefined;
    }

    static getInstance() {
        if (!Validation.instance) {
            Validation.instance = new Validation();
        }
        return Validation.instance;
    }
}

