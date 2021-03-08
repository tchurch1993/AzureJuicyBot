const haloFilePath = '../../../assets/files/halodialoge.txt';
const fs = require('fs');

module.exports = function getRandomHaloQuote() {

    //TODO: find different way to load in quotes
    let data = fs.readFileSync(__dirname + haloFilePath, 'utf8');

    try {
        let haloQuoteArray = data.split("\n");
        let randoNum = Math.floor(Math.random() * haloQuoteArray.length - 1);
        return haloQuoteArray[randoNum];
    } catch (error) {
        console.error(error);
        return null;
    }
}