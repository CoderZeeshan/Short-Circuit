const fakeData = require("./fakeData");

const { rank } = require("./scoring");

const results = rank(fakeData, "balanced");

console.log(results);