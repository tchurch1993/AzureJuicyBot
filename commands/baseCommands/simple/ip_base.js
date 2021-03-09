const http = require('http');
const config = require("./../../../config.json");

module.exports = function getIp(memberId) {
    if (config.whiteList.includes(memberId)) {


        var isDone = false;
        var finalIp;



        http.get({
            'host': 'api.ipify.org',
            'port': 80,
            'path': '/'
        }, (resp) => {

            resp.on('data', (ip) => {
                finalIp = ip;
                isDone = true;
            })

            resp.on('error', (err) => {
                console.error(err);
                finalIp = null;
                isDone = true;
            })
        });
        //TODO: I hate how I am doing this to get around async functions
        while (!isDone) {
            setTimeout(() => {}, 100);
        }

        return finalIp;
    }
}