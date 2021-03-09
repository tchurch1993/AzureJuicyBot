const {
    SlashCommand
} = require('slash-create');

module.exports = class SayCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'say',
            description: 'Repeats what you typed back at you!',
            options: [{
                type: 3,
                name: "message",
                description: "what would you like the bot to say?",
                required: true
            }]
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        return ctx.options.message;
    }
}