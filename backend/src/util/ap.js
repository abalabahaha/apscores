"use strict";

const Cheerio = require("cheerio");

module.exports.parseScores = (pageHTML) => {
    let index = pageHTML.indexOf("<!-- main width container -->");
    if(index !== -1) {
        pageHTML = pageHTML.substring(index);
    }
    index = pageHTML.indexOf("<div id=\"siteFooter\">");
    if(index !== -1) {
        pageHTML = pageHTML.substring(0, index);
    }

    let lowercasePageHTML = pageHTML.toLowerCase();
    if(pageHTML.includes("An unexpected error occurred")
        || pageHTML.includes("We are unable to process your request due to a system error")
        || (lowercasePageHTML.includes("sorry") && lowercasePageHTML.includes("error"))) {
        throw new CBError("CollegeBoard.org is not responding, try again in a bit");
    }

    let page = Cheerio.load(pageHTML);
    let yearsData = [];
    try {
        page("#scoresListArea").find(".year-scores").each((i, yearPage) => {
            let yearData = {
                name: "-1000BC",
                scores: []
            };

            try {
                yearData.name = page(".headline>h3", yearPage).text().trim();
            } catch(err) {
                console.error(err);
                console.error("Error getting scores: bad score formatting 4");
            }

            try {
                page(yearPage).find(".year-exams-container>.item").each((j, scoreRow) => {
                    let scoreData = {
                        name: "----",
                        value: "error"
                    };

                    try {
                        scoreData.name = page(".span5>h4", scoreRow).text().trim();

                        scoreData.value = page(".span5>span", scoreRow).text().trim();
                        if(scoreData.value && scoreData.value.startsWith("Your score:")) {
                            scoreData.value = scoreData.value.substring(12).trim();
                        }

                        let subscoreRows = page(".span5>.bullet>li", scoreRow);
                        if(subscoreRows && subscoreRows.length > 0) {
                            scoreData.subscores = [];

                            subscoreRows.each((k, subscoreRow) => {
                                let children = page(subscoreRow).contents();
                                if(children.length < 2) {
                                    console.error("Error getting scores: bad score formatting 5");
                                    return;
                                }

                                let subscoreName = children.get(0);
                                if(children.get(0).type !== "text") {
                                    console.error("Error getting scores: bad score formatting 5.1");
                                    return;
                                }
                                subscoreName = page(subscoreName).text().trim();
                                if(subscoreName.endsWith(":")) {
                                    subscoreName = subscoreName.substring(0, subscoreName.length - 1).trim();
                                }

                                let subscoreValue = children.get(1);
                                if(children.get(1).name !== "em") {
                                    console.error("Error getting scores: bad score formatting 5.2");
                                    return;
                                }
                                subscoreValue = page(subscoreValue).text().trim();

                                scoreData.subscores.push({
                                    name: subscoreName,
                                    value: subscoreValue
                                });
                            });
                        }
                    } catch(err) {
                        console.error(err);
                        console.error("Error getting scores: bad score formatting 3");
                    }

                    yearData.scores.push(scoreData);
                });
            } catch(err) {
                console.error(err);
                console.error("Error getting scores: bad score formatting 2");
            }

            yearsData.push(yearData);
        });
    } catch(err) {
        console.error(err);
        throw new CBError("Error getting scores: bad score formatting");
    }

    return yearsData;
};

module.exports.parseTerms = (pageHTML) => {
    let page = Cheerio.load(pageHTML);
    try {
        let terms = page("#termsAndConditions").html();
        terms = terms.replace(/<span class="visuallyhidden">Opens in a new window<\/span>/g, "");

        let split = terms.split("<");
        terms = split[0];
        for(let i = 1; i < split.length; ++i) {
            if(!split[i].startsWith("/")
                 && !split[i].startsWith("a ")
                 && !split[i].startsWith("span ")
                 && !split[i].startsWith("strong>")) {
                terms += "&lt;" + split[i].replace(/>/g, "&gt;");
            } else {
                terms += "<" + split[i];
            }
        }

        return terms;
    } catch(err) {
        console.error(err);
        throw new CBError("Error getting terms: bad formatting");
    }
};
