const commando = require('discord.js-commando');
const setVoice = require('../../baseCommands/talk/set_talk_voice_base');

module.exports = class SetTalkVoiceCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'setvoice',
            group: 'talk',
            memberName: 'setvoice',
            description: 'sets the voice for the talk command',
            guildOnly: true,
        })
    }

    //TODO: add a list of accents if their selection does not exist
    async run(message, args) {

        let isSuccessful = setVoice(args, message.member.id, message.guild.id);

        if (isSuccessful) {
            message.channel.send(`Talk voice set to : ${args}`);
        } else {
            message.channel.send("sound not found");
        }
    }
}
