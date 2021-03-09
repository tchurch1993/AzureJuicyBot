const {
    SlashCommand
} = require('slash-create');
const discord = require('discord.js');
const getIp = require('../../baseCommands/simple/ip_base');


module.exports = class IpCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'server ip',
            description: 'grabs ip address of the server',
            guildIDs: ["575236595641352203", "697481997148356669"]
        });
        this.filePath = __filename;
    }

    async run(ctx) {

        var ip = getIp(ctx.member.id);
        
        if (ip) {
            //return "The IP is " + ip + ":25565";
        }

    }
}