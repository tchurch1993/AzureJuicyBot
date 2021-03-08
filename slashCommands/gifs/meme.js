const {SlashCommand} = require('slash-create');
const getGif = require('../../baseCommands/gifs/memeBase');

module.exports = class MemeCommand extends SlashCommand {
    constructor(creator){
        super(creator, {
            name: 'meme',
            description: 'sends random meme!',
            options: [{
                type: 3,
                name: "query",
                description: "What would you like to search for?",
                required: true
            }]
        })
    }

    async run(ctx){
        return getGif(ctx.options.query);
    }
}