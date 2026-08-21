const videoData = require("./videoData");

const { rank } = require("./scoring");

const results = rank(videoData, "overall");

console.log(results);