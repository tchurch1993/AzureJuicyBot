const Gyfcat = require('gfycat-sdk');
const config = require('../../../config.json');


//TODO: find better API for gifs/memes
module.exports = function getGif(searchText, callback) {
    var YOUR_CLIENT_ID = "2_c6DhgR";
    var YOUR_CLIENT_SECRET = "UkS_ClO0XWPV3Fe23V4nSJSHP6s_BqRBClsf4E08PeL3UZuLPl2IR4fnk4tkPfoG";

    var options = {
        client_id: "2_c6DhgR",
        client_secret: "UkS_ClO0XWPV3Fe23V4nSJSHP6s_BqRBClsf4E08PeL3UZuLPl2IR4fnk4tkPfoG"
    }

    var gfycat = new Gyfcat({clientId: YOUR_CLIENT_ID, clientSecret: YOUR_CLIENT_SECRET});

    gfycat.authenticate((err, data) => {
        //if (err) return console.error(err);


        let options = {
            search_text: searchText,
            count: 5,
            first: 1
        };
        gfycat.search(options).then(data => {
            if (data.gfycats.length > 0) {
                var diceRoll = Math.floor(Math.random() * data.gfycats.length);
                return callback(data.gfycats[diceRoll].max2mbGif.toString());
            } else {
                return callback("ain't no memes here kiddo");
            }
        });

    });
}