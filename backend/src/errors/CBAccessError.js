"use strict";

class CBAccessError extends Error {
    constructor(msg) {
        super(msg);

        this.custom = true;
        this.status = 403;
    }
}

module.exports = CBAccessError;
