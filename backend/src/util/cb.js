"use strict";

const Axios = require("axios");
const HTTPS = require("https");
const Querystring = require("querystring");
const ToughCookie = require("tough-cookie");

const APUtil = require("./ap");
const AuthError = require("../errors/AuthError");
const CBAccessError = require("../errors/CBAccessError");
const CBError = require("../errors/CBError");

const axios = Axios.create({
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Origin": "https://apscore.collegeboard.org",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
    },
    httpsAgent: new HTTPS.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 4096,
        maxFreeSockets: 1024
    }),
    maxRedirects: 0,
    responseType: "text",
    timeout: 30000,
    validateStatus(status) {
        return status >= 200 && status <= 504
    }
});

module.exports.getScores = async (jar) => {
    if(!jar) {
        throw new CBError("Error getting scores: bad session");
    }

    const resp = await axios.get("https://apscore.collegeboard.org/scores/view-your-scores", {
        headers: {
            "Cookie": jar.getCookieStringSync("https://apscore.collegeboard.org/scores/view-your-scores")
        }
    });
    if(resp.status === 500) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }

    if(resp.status === 302) {
        let location = resp.headers.location;
        if(location === "https://apscore.collegeboard.org/scores/#m=signin-form&scores" || location.startsWith("https://ecl.collegeboard.org/account/login.jsp")) {
            throw new CBAccessError("Error getting scores: invalid login");
        } else if(location === "https://apscore.collegeboard.org/scores/viewTermsAndConditions.action") {
            let tac = null;
            try {
                const termsResp = await axios.get("https://apscore.collegeboard.org/scores/viewTermsAndConditions.action", {
                    headers: {
                        "Cookie": jar.getCookieStringSync("https://apscore.collegeboard.org/scores/viewTermsAndConditions.action")
                    }
                });
                tac = APUtil.parseTerms(termsResp.data);
            } catch(err) {
                throw new CBAccessError("You must accept the College Board terms and conditions");
            }
            throw new CBAccessError("You must accept the College Board terms and conditions", tac);
        } else if(location === "https://apscore.collegeboard.org/scores/displayVerifyAccount.action") {
            throw new CBAccessError("You must verify your account with College Board");
        } else if(location === "http://www.apscore.org/schedule.html#NA") {
            throw new CBError("College Board has disabled login until 8AM. Hold tight!");
        } else if(location === "http://www.apscore.org/highvolume.html") {
            throw new CBError("CollegeBoard.org is overloaded, try again in a bit");
        } else {
            console.error(`  /view-your-scores: Location ${location}`);
            throw new CBError(`Error getting scores: unexpected redirect to ${location}`);
        }
    }
    if(resp.status !== 200 || !resp.headers["content-type"] || !resp.headers["content-type"].startsWith("text/html")) {
        console.error(`  /view-your-scores: Status ${resp.status}`);
        throw new CBError("Error getting scores: invalid response");
    }

    let pageHTML = resp.data;
    if(typeof pageHTML !== "string") {
        console.error(`  /view-your-scores: Status ${resp.status}`);
        throw new CBError("Error getting scores: invalid data");
    }

    return APUtil.parseScores(pageHTML);
};

module.exports.login = async (field3, field2) => {
    const qs = Querystring.stringify({
        "idp": "ECL",
        "isEncrypted": "N", // but it is...
        "DURL": "https://www.collegeboard.org",
        "password": field2,
        "username": field3,
        "appId": 292,
        "formState": 1
    });
    const resp = await axios.post("https://account.collegeboard.org/login/authenticateUser", qs);
    if(resp.status === 500) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }
    if(resp.status === 200) {
        throw new AuthError("Error logging in: incorrect username or password");
    }
    if(resp.status !== 302 || typeof resp.headers.location !== "string") {
        console.error(`  /authenticateUser: Status ${resp.status}`);
        throw new CBError("Error logging in: invalid authentication redirect");
    }
    if(resp.headers.location.includes("/login/handleError")) {
        throw new CBError("CollegeBoard.org is overloaded, try again in a bit");
    }
    if(resp.headers.location.includes("/login/forgotPassword")) {
        throw new AuthError("Error logging in: College Board has temporarily locked your account because of too many incorrect password attempts. Reset your password at https://account.collegeboard.org/login/forgotPassword");
    }
    if(!resp.headers.location.startsWith("https://ecl.collegeboard.com/account/loginBridge.jsp")) {
        console.error(`  /authenticateUser: Location ${resp.headers.location}`);
        throw new CBError("Error logging in: unknown authentication redirect");
    }

    const jar = new ToughCookie.CookieJar();
    if(resp.headers["set-cookie"]) {
        for(let setCookie of resp.headers["set-cookie"]) {
            try {
                jar.setCookieSync(setCookie, "https://account.collegeboard.org/login/authenticateUser");
            } catch(err) {}
        }
    }

    return jar.serializeSync();
};

module.exports.postNumbers = async (jar, numbers) => {
    const data = {
        "mode": "verify"
    };
    if(numbers.apNumber) {
        data["userProfile.studentDataEntered.apYear"] = numbers.apNumberYear;
        data["userProfile.studentDataEntered.apNumber"] = numbers.apNumber;
    }
    if(numbers.studentID) {
        data["userProfile.studentDataEntered.studentId"] = numbers.studentID;
    }

    const resp1 = await axios.get("https://apscore.collegeboard.org/scores/displayVerifyAccount.action", {
        headers: {
            "Cookie": jar.getCookieStringSync("https://apscore.collegeboard.org/scores/displayVerifyAccount.action")
        }
    });
    if(resp1.status === 500) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }
    if(resp1.status !== 200) {
        console.error(`  /displayVerifyAccount.action: Status ${resp1.status}`);
        throw new CBError("Error submitting data: invalid form response");
    }

    if(resp1.headers["set-cookie"]) {
        for(let setCookie of resp1.headers["set-cookie"]) {
            try {
                jar.setCookieSync(setCookie, "https://apscore.collegeboard.org/scores/displayVerifyAccount.action");
            } catch(err) {}
        }
    }

    let pageHTML = resp1.data;
    if(typeof pageHTML !== "string") {
        console.error(`  /verifyAccount.action: Status ${resp1.status}`);
        throw new CBError("Error submitting data: invalid form");
    }
    let regexMatch = pageHTML.match(/name="token" value="(\w+)"/);
    if(!regexMatch || typeof regexMatch[1] !== "string" || regexMatch[1].length < 16 || regexMatch[1].length > 32) {
        console.error(`  /verifyAccount.action: Token ${regexMatch && regexMatch[1]}`);
        throw new CBError("Error submitting data: invalid form token");
    }
    data["struts.token.name"] = "token";
    data["token"] = regexMatch[1];

    const qs = Querystring.stringify(data);
    const resp2 = await axios.post("https://apscore.collegeboard.org/scores/verifyAccount.action", qs, {
        headers: {
            "Cookie": jar.getCookieStringSync("https://apscore.collegeboard.org/scores/verifyAccount.action")
        }
    });
    if(resp2.status === 500) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }
    if(resp2.status === 302) {
        throw new AuthError("Error submitting AP Number/Student ID");
    }
    if(resp2.status !== 200) {
        console.error(`  /verifyAccount.action: Status ${resp2.status}`);
        throw new CBError("Error submitting data: invalid response");
    }

    if(resp2.headers["set-cookie"]) {
        for(let setCookie of resp2.headers["set-cookie"]) {
            try {
                jar.setCookieSync(setCookie, "https://apscore.collegeboard.org/scores/verifyAccount.action");
            } catch(err) {}
        }
    }

    return jar.serializeSync();
};

module.exports.postTerms = async (jar) => {
    const qs = Querystring.stringify({
        "__checkbox_termsChecked": true,
        "termsChecked": true
    });
    const resp = await axios.post("https://apscore.collegeboard.org/scores/termsAndConditions.action", qs, {
        headers: {
            "Cookie": jar.getCookieStringSync("https://apscore.collegeboard.org/scores/termsAndConditions.action")
        }
    });
    if(resp.status === 500) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }
    if(resp.status === 200) {
        throw new AuthError("Error accepting terms");
    }
    if(resp.status !== 302 || typeof resp.headers.location !== "string") {
        console.error(`  /termsAndConditions.action: Status ${resp.status}`);
        throw new CBError("Error accepting terms: invalid redirect");
    }
    if(!resp.headers.location.startsWith("https://apscore.collegeboard.org/scores/viewScore.action")) {
        console.error(`  /termsAndConditions.action: Location ${resp.headers.location}`);
    }

    if(resp.headers["set-cookie"]) {
        for(let setCookie of resp.headers["set-cookie"]) {
            try {
                jar.setCookieSync(setCookie, "https://apscore.collegeboard.org/scores/termsAndConditions.action");
            } catch(err) {}
        }
    }

    return jar.serializeSync();
};
