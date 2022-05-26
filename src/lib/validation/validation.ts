import {isGovernmentEmailAddress} from "./email-validator/emailValidator";

const emailValidator = require('./email-validator');
import fs from 'fs';
import isRfc822Compliant from "./email-validator/isRfc822Compliant";

export default class Validation {
    static instance: Validation;

    constructor() {}

    async validate(form: Map<string, string>, requiredFields: Map<string, string>): Promise<Map<string, string>> {
        const errors = new Map();

        requiredFields.forEach((errorMessage, field) => {
            if (this.fieldHasNoValue(field, form)) {
                errors.set(field, errorMessage);
            }
        });

        if (!errors.has('email')) {
            if (this.invalidEmailAddress(form)) {
                errors.set('email', 'Enter an email address in the correct format, like name@gov.uk');
            } else if (await this.notGovernmentEmail(form)) {
                console.log("not government email address")
                errors.set('email', 'Enter a government email address');
            }
        }

        return errors;
    }

    fieldHasNoValue(field: string, form: Map<string, string>): boolean {
        return form.get(field) == '' || form.get(field) == undefined;
    }

    invalidEmailAddress(form: Map<string, string>): boolean {
        console.log((form.get('email') || '').trim())
        return isRfc822Compliant((form.get('email') || '').trim())
    }

    async notGovernmentEmail(form: Map<string, string>): Promise<boolean> {
        return !(isGovernmentEmailAddress((form.get('email') || '').trim()));
    }

    static getInstance() {
        if (!Validation.instance) {
            Validation.instance = new Validation();
        }
        return Validation.instance;
    }
}

