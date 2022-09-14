"use strict";

// npm dependencies
const rfc822Validator = require("rfc822-validate");

module.exports = (email: string) => {
    if (!rfc822Validator(email)) {
        return false;
    } else {
        const domain = email.split("@")[1];
        return !(domain && domain.indexOf(".") === -1);
    }
};
