const fetch = require('node-fetch');

module.exports = async function getDadJoke(){
    try {
        var result = await fetch("https://icanhazdadjoke.com/", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        
        var text = await result.json();

        return text.joke;
    } catch (err) {
        console.error(err)
        return null;
    }
}