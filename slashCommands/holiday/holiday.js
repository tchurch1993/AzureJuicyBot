const {
    SlashCommand
} = require('slash-create');
const getHolidayInfo = require('../../baseCommands/holiday/holidayBase');
const discord = require('discord.js');

module.exports = class HolidayCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "holiday",
            description: "displays what holiday it is today!"
        })


    }
    async run(ctx) {
        var holidayInfo = await getHolidayInfo();
        return holidayInfo.holidayURL;
    }
}