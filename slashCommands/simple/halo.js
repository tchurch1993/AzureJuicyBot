const {
    SlashCommand
} = require('slash-create');
const getRandomHaloQuote = require('../../baseCommands/simple/halo_base');

module.exports = class HaloCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'halo',
            description: 'says a random halo quote!'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        var haloQuote = getRandomHaloQuote();

        if (haloQuote) {
            return haloQuote;
        }

    }
}