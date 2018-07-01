"use strict";

class CBError extends Error {
    constructor(msg, extra) {
        super(msg);

        this.custom = true;
        this.status = 502;

        if(extra) {
            this.extra = extra;
        }
    }
}

module.exports = CBError;
