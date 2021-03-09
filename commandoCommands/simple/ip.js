const commando = require('discord.js-commando');
const getIp = require('../../baseCommands/simple/ip_base');

class IPCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'ip',
            group: 'simple',
            memberName: 'ip',
            description: 'grabs ip address of the server',
            hidden: true
        })
    }
    //TODO: maybe just take this command out entirely since it is just for my minecraft peoples
    async run(message, args) {

        var ip = getIp(message.author.id);
        if (ip) {
            message.author.send("The IP is " + ip + ":25565");
        }
    }
}

module.exports = IPCommand;