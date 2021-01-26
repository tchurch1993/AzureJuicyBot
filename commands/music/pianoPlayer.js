const commando = require('discord.js-commando');
const GuildVolume = require('../../database/helpers/guildVolume');
const piano = require('../../helpers/audio/piano');
const config = require('../../config.json');
const WEBSITE_URL = config.juicyBotWebsiteURL;

class PianoCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'piano',
            group: 'music',
            memberName: 'piano',
            description: 'A fun piano to collaborate with your friends with!'
        })
    }

    /*
     when the command is triggered we want to first check to see if there is already an entry in the global piano map
     with that same Guild ID. if so we should just send the link to the website. if there is no entry we create one as well
     as join the same voice channel as the user who submitted the command.
     
     This object that we add to the global map will have the key set to the GuildId and have the TextChannelID, VoiceConnection object, and maybe volume?
     */
    async run(message, args) {

        const textChannelId = message.channel.id;
        const voiceChannelId = message.member.voice.channel.id;
        const guildId = message.guild.id;

        const voiceChannel = message.member.voice.channel;

        let guildPianoPlayer = global.piano.get(message.guild.id);

        if (!guildPianoPlayer) {

            if(!this.commandChecks(voiceChannel, message)){
                return;
            }

            let guildVolume = await GuildVolume.GetVolume(message.guild.id);

            const pianoConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                volume: guildVolume
            }
            
            global.piano.set(message.guild.id, pianoConstruct);
            var connection = await voiceChannel.join();
            pianoConstruct.connection = connection;

            message.channel.send(WEBSITE_URL + "/" + message.guild.id);

        } else {
            if(args.includes("stop")){

                var currentVoiceChannel = message.client.voice.connections.get(guildId).channel;

                try {
                    await currentVoiceChannel.leave();
                } catch (error) {
                    console.error(error);
                }
                global.piano.delete(message.guild.id);
                return;
            }
            message.channel.send(WEBSITE_URL + "/" + message.guild.id);
        }

    }

    commandChecks(voiceChannel, message) {

        if (!voiceChannel) {
            message.channel.send("You ain't in no voice channel broski");
            return false;
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT")) {
            message.channel.send("I ain't got permissions to join bruh");
            return false;
        }

        var serverQueue = global.queue.get(message.guild.id);

        if (serverQueue && serverQueue.songs > 0) {
            message.channel.send("Bruh, stop what I am already doing first. like damn bro");
            return false;
        }

        return true;
    }
}

module.exports = PianoCommand;