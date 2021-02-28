const {
    SlashCommand
} = require('slash-create');

module.exports = class SayCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'say',
            description: 'Repeats what you typed back at you!'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        return `Hello, ${ctx.user.username}!`;
    }
}