const commando = require('discord.js-commando');
const getGif = require('../../baseCommands/gifs/memeBase');
class MemeCommand extends commando.Command {
    constructor(bot){
        super(bot,{
            name: 'meme',
            group: 'gifs',
            memberName: 'meme',
            description: 'sends random meme!'
        })
    }


    async run(message, args){
        message.channel.send(getGif(args));
    }
}

module.exports = MemeCommand;