const Gyfcat = require('gfycat-sdk');
const config = require('../../config.json');


    //TODO: find better API for gifs/memes
module.exports = function getGif(searchText){
    var gfycat = new Gyfcat(config.gfycat);

        gfycat.authenticate((err, data) => {
            let options = {
                search_text: searchText,
                count: 5,
                first: 1
            };
            gfycat.search(options).then(data => {
                if(data.gfycats.length > 0){
                    var diceRoll = Math.floor(Math.random() * data.gfycats.length);
                    return data.gfycats[diceRoll].max2mbGif.toString();
                } else{
                    return "ain't no memes here kiddo";
                }
            });
            
        });
}