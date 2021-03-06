const commando = require('discord.js-commando');

class StopCommand extends commando.Command {
    constructor(bot){
        super(bot,{
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'stops the music bot',
            guildOnly: true,
        })
    }

    async run(message, args){
        try {
            if (!message.member.voice.channel)
        return message.channel.send(
          "You have to be in a voice channel to stop the music!"
        );

        let serverQueue = global.queue.get(message.guild.id);

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        } catch (error) {
            console.error(error)
        }
        
    }
}

module.exports = StopCommand;