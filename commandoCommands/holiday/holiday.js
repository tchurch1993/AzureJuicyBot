const commando = require('discord.js-commando');
const discord = require('discord.js');
const getHolidayInfo = require('../../baseCommands/holiday/holidayBase');

class HolidayCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'holiday',
            group: 'holiday',
            memberName: 'holiday',
            description: 'displays what holiday it is today!',
        })
    }

    async run(message, args) {
        var holidayInfo = await getHolidayInfo();
        message.channel.send(holidayInfo.holidayURL);

    }
}


module.exports = HolidayCommand;