"use strict";

const AuthUtil = require("../util/auth");
const CBUtil = require("../util/cb");

module.exports.login = async(ctx, next) => {
    ctx.checkBody({
        field2: {
            notEmpty: true,
            errorMessage: "Invalid password"
        },
        field3: {
            isLength: {
                options: [{
                    min: 4,
                    max: 20
                }]
            },
            notEmpty: true,
            errorMessage: "Invalid username"
        }
    });
    (await ctx.getValidationResult()).throw();

    const { field2, field3 } = ctx.request.body;

    const session = await CBUtil.login(field3, field2);
    const enc = AuthUtil.encode(session);

    ctx.body = {
        token: enc
    };

    await next();
};

module.exports.logout = async(ctx, next) => {
    // TODO

    ctx.status = 204;

    await next();
};
