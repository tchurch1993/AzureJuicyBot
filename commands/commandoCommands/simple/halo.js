const commando = require('discord.js-commando');
const getRandomHaloQuote = require('../../baseCommands/simple/halo_base');

class HaloCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'halo',
            group: 'simple',
            memberName: 'halo',
            description: 'says a random halo quote!',
        })
    }

    async run(message, args) {
        let haloQuote = getRandomHaloQuote();

        if(haloQuote){
            message.channel.send(haloQuote);
        }

    }
}

module.exports = HaloCommand;