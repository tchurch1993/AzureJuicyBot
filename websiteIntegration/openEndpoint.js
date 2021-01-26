const express = require('express');
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
        let channelId = req.query.channelId;
        let key = req.query.key;
        if(global.piano.has(channelId)){
            
        }

    })





    app.listen(port, () => console.log('listening on port ' + port))

}

function openTCPSocket() {
    //TODO: create a TCP server for piano application for testing
}

module.exports = {
    openEndpoint
};