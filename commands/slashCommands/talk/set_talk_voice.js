const {
    SlashCommand
} = require('slash-create');
const setVoice = require('../../baseCommands/talk/set_talk_voice_base');

module.exports = class SetTalkVoiceCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'setvoice',
            description: 'setvoice',
            options: [{
                type: 3,
                name: "voice",
                description: "which voice would you like to change to?",
                required: true,
                choices: [{
                        name: "indian",
                        value: "indian"
                    },
                    {
                        name: "english",
                        value: "english"
                    },
                    {
                        name: "american",
                        value: "american"
                    },
                    {
                        name: "australian",
                        value: "australian"
                    },
                    {
                        name: "russian",
                        value: "russian"
                    }
                ]
            }]
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        let isSuccessful = await setVoice(ctx.options.voice, ctx.member.id, ctx.guildID);

        if (isSuccessful) {
            return `Talk voice set to : ${ctx.options.voice}`;
        } else {
            return `unsuccessfully set voice to : ${ctx.options.voice}`;
        }
    }
}