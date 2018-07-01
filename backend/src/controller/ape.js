"use strict";

const AuthUtil = require("../util/auth");
const CBUtil = require("../util/cb");

module.exports.getScores = async(ctx, next) => {
    const scores = await CBUtil.getScores(ctx.state.session);

    ctx.body = scores;

    await next();
};

module.exports.postNumbers = async(ctx, next) => {
    ctx.checkBody({
        apNumber: {
            optional: true,
            isInt: {
                options: [{
                    min: 10000000,
                    max: 99999999
                }]
            },
            errorMessage: "Invalid AP number"
        },
        apNumberYear: {
            optional: true,
            isInt: {
                options: [{
                    min: 2015,
                    max: 2018
                }]
            },
            errorMessage: "Invalid AP number year"
        },
        studentID: {
            optional: true,
            isLength: {
                options: [{
                    min: 1,
                    max: 25
                }]
            },
            errorMessage: "Invalid student ID"
        }
    });
    (await ctx.getValidationResult()).throw();

    if(!ctx.request.body || (!ctx.request.body.studentID && !ctx.request.body.apNumber)) {
        throw new FormError("Missing AP number or student ID");
    }
    if(ctx.request.body.apNumber && !ctx.request.body.apNumberYear) {
        throw new FormError("Invalid AP number year");
    }

    const session = await CBUtil.postNumbers(ctx.state.session, ctx.request.body);
    const enc = AuthUtil.encode(session);

    ctx.body = {
        token: enc
    };

    await next();
};

module.exports.postTerms = async(ctx, next) => {
    const session = await CBUtil.postTerms(ctx.state.session);
    const enc = AuthUtil.encode(session);

    ctx.body = {
        token: enc
    };

    await next();
};
