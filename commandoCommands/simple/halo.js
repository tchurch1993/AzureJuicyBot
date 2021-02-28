const commando = require('discord.js-commando');
const haloFilePath = '../../../assets/files/halodialoge.txt';
//const haloFile = require('../../assets/files/halodialoge.txt');
const fs = require('fs');

class HaloCommand extends commando.Command {
    constructor(bot) {
        super(bot, {
            name: 'halo',
            group: 'simple',
            memberName: 'halo',
            description: 'says a random halo quote!',
        })
    }

    async run(message, args) {

        //TODO: find different way to load in quotes
        fs.readFile(__dirname + haloFilePath, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }


            try {
                let haloQuoteArray = data.split("\n");
                let randoNum = Math.floor(Math.random() * haloQuoteArray.length - 1);
                message.channel.send(haloQuoteArray[randoNum]);
            } catch (error) {
                console.error(error);
            }

        });

        //message.channel.send(args);

    }
}

module.exports = HaloCommand;