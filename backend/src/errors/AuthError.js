"use strict";

class AuthError extends Error {
    constructor(msg) {
        super(msg);

        this.custom = true;
        this.status = 401;
    }
}

module.exports = AuthError;
