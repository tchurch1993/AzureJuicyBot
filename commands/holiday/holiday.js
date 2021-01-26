const commando = require('discord.js-commando');
const config = require("./../../config.json");
const cheerio = require("cheerio");
const discord = require('discord.js');
const fetch = require('node-fetch')

const HOLIDAY_API_URL = "https://www.daysoftheyear.com/days/";


class HolidayCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'holiday',
            group: 'holiday',
            memberName: 'holiday',
            description: 'displays what holiday is on that day',
        })
    }

    async run(message, args) {

        try {
            var date = new Date();
            var year = date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var apiEndpoint = HOLIDAY_API_URL;
            apiEndpoint += year + "/" + month + "/" + day;

            var result = await fetch(apiEndpoint);
            //console.log(result);
            var html = await result.text();

            var selector = cheerio.load(html);
            //console.log(html);

            var HolidayElement = selector("body").find("div[class='card card--day card--alt linked']").first();
            var holidayImageElement = HolidayElement.find("div[class='card__media card__image cover']").find("img");
            var holidayImageLink = holidayImageElement[0].attribs.src;

            var holidayNameElement = HolidayElement.find("div[class='card__content']");
            var holidayTitle = holidayNameElement.find("h3[class='card__title heading']").text();
            var holidayURL = holidayNameElement.find("h3[class='card__title heading']").find("a[class=js-link-target]")[0].attribs.href
            var holidayDescription = holidayNameElement.find("div[class='card__excerpt']").text();

            var holidayMessage = new discord.MessageEmbed()
                .setTitle(holidayTitle)
                .setDescription(holidayDescription)
                .setURL(holidayURL)
                .setColor('RANDOM')
                .setThumbnail(holidayImageLink)
                .setFooter((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())
            message.channel.send(holidayMessage);


        } catch (err) {
            console.error(err);
            message.channel.send("aww shit, somebody took a big ol' poopy")

        }

    }
}


module.exports = HolidayCommand;