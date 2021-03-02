const {
    SlashCommand
} = require('slash-create');
const fs = require('fs');
const haloFilePath = '../../../assets/files/halodialoge.txt';

module.exports = class HaloCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'halo',
            description: 'says a random halo quote!'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        let data = fs.readFileSync(__dirname + haloFilePath, 'utf8');

        try {
            let haloQuoteArray = data.split("\n");
            let randoNum = Math.floor(Math.random() * haloQuoteArray.length - 1);
            return haloQuoteArray[randoNum];
        } catch (error) {
            console.error(error);
        }

    }
}