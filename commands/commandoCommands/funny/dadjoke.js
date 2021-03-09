const getDadJoke = require('../../baseCommands/funny/dadjokeBase');
const { Command } = require('discord.js-commando');
module.exports =  class DadJokeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: "dadjoke",
            group: "funny",
            memberName: "dadjoke",
            description: "tells hilarious dad jokes. you are welcome",
        });
    }

    async run(message, args) {
        var dadJoke = await getDadJoke();
        if (dadJoke) {
            message.channel.send(dadJoke);
        }
    }
}