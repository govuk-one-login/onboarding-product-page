const emailValidator = require('../email-validator');
import {promises as fs} from 'fs';

export default class Validation {
    form: Map<string, string>;
    requiredFields: Map<string, string>;
    requiredConditionalFields: Map<string, Map<string, string>> | undefined;
    validEmailDomains: string[];

    constructor(form: Map<string, string>, requiredFields: Map<string, string>, requiredConditionalFields?: Map<string, Map<string, string>>) {
        this.form = form;

        this.requiredFields = requiredFields;
        this.requiredConditionalFields = requiredConditionalFields;

        this.validEmailDomains = // get this from config eventually
            [
                "gov.uk",
                "nhs.uk",
                "nhs.net",
                "nhs.scot",
                "police.uk",
                "cjsm.net",
                "ac.uk",
                "sch.uk",
                "onevoicewales.wales",
                "suttonmail.org",
                "highwaysengland.co.uk"
            ]
    }

    async loadExtendedEmailDomains(): Promise<void> {
        let extendedDomains: string[] = [];
        await fs.readFile("./valid-email-domains.txt", "utf-8")
            .then((emails) => {
                    extendedDomains = emails.split("\n");
                    this.validEmailDomains = this.validEmailDomains.concat(extendedDomains);
                }
            )
            .catch(() => console.error("No extended email domains provided"))
    }

    validate(): Map<string, string> {
        const errors = new Map();

        this.requiredFields.forEach((errorMessage, field) => {
            if (this.fieldHasNoValue(field)) {
                errors.set(field, errorMessage);
            }
        });

        if (this.requiredConditionalFields) {
            this.requiredConditionalFields.forEach((conditionalFieldAndErrorMessage, field) => {
                if (this.form.get(field) == "yes") {
                    let entry = conditionalFieldAndErrorMessage.entries().next().value
                    if (this.fieldHasNoValue(entry[0])) {
                        errors.set(entry[0], entry[1]);
                    }
                }
            });
        }

        if (!errors.has('email')) {
            if (this.invalidEmailAddress()) {
                errors.set('email', 'Enter an email address in the correct format, like name@gov.uk');
            } else if (this.notGovernmentEmail()) {
                errors.set('email', 'You must enter a government email address');
            }
        }

        return errors;
    }

    fieldHasNoValue(field: string): boolean {
        return this.form.get(field) == '' || this.form.get(field) == undefined;
    }

    invalidEmailAddress(): boolean {
        return !emailValidator(this.form.get('email'))
    }

    notGovernmentEmail(): boolean {
        // "" will match anything and we get that if there's an empty line at the end of valid-email-domains.txt
        let match = this.validEmailDomains.find(suffix => {
            // @ts-ignore
            return this.form.get('email').trim().endsWith(suffix) && suffix != "";
        });
        return match == undefined;
    }
}


