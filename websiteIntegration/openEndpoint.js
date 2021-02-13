const express = require('express');
const cors = require('cors');
const playPiano = require('../helpers/audio/piano');
const DEFAULT_PORT = 3001;

function openEndpoint(client, port = DEFAULT_PORT) {
    var app = express();

    app.post('/', (req, res) => {
        let channels = client.channels.cache
        let key = req.query.key;
        console.log("got a request!");
        if (channels.has(req.query.channelId)) {
            let channel = channels.get(req.query.channelId)
            if (channel.isText()) {
                channel.send("key is " + key);
            } else {
                channel.join();
            }
        }
        res.send('yo');
    });

    app.post('/piano', (req, res) => {
        let guildId = req.query.guildId;
        let key = req.query.key;
        let pianoPlayer = global.piano.get(guildId);
        if (pianoPlayer) {
            console.log(`in piano post with key: ${key} and guildID: ${guildId}`)
            playPiano(key, guildId);
        }

    })

    app.get('/pianoGuild', (req, res) => {
        console.log(`API HIT with GuildId: ${req.query.guildId}`);
        let isValid = false;

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        if(global.piano.has(req.query.guildId)){
            isValid = true;
        }
        res.send({
            isValid: isValid
        });
    })




    app.use(cors());
    app.listen(port, () => console.log('listening on port ' + port));

}

function openTCPSocket() {
    //TODO: create a TCP server for piano application for testing
}

module.exports = {
    openEndpoint
};