const config = require('../../config.json')
const validURL = require('../util/util');
const TokCommand = require('../../commandoCommands/video/tiktok_conversion')

module.exports = function tok(message, bot){

    if(message.author.bot) return;
    let args = message.content;

    if(validURL(args)){
        if(args.includes("vm.tiktok.com")){
            let command = new TokCommand(bot)
            command.run(message, message.content)
        }
    }

}