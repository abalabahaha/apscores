"use strict";

const AES256 = require("aes256");

const AuthError = require("../errors/AuthError");

const SECRET = "secret";

module.exports.decode = (str) => {
    if(str.length < 8) {
        throw new AuthError("Bad token");
    }

    return JSON.parse(AES256.decrypt(SECRET, str));
};

module.exports.encode = (session) => {
    return AES256.encrypt(SECRET, JSON.stringify(session));
};
