const { SlashCommand } = require('slash-create');
const getDadJoke = require('../../baseCommands/funny/dadjokeBase');


module.exports =  class DadJokeCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'dadjoke',
            description: 'tells hilarious dad jokes. you are welcome'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        var dadJoke = await getDadJoke();
        if (dadJoke) {
            return dadJoke;
        }
    }
}

