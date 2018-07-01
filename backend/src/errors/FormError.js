"use strict";

class FormError extends Error {
    constructor(msg) {
        super(msg);

        this.custom = true;
        this.status = 400;
    }
}

module.exports = FormError;
