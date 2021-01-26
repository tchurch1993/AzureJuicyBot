const PIANO_ENUM = require('../../helpers/audio/PianoEnum.js');

module.exports = function playPiano(key, guildId){

    let pianoPlayer = global.piano.get(guildId);

    if(!pianoPlayer){
        let soundpath = PIANO_ENUM.get(key);

        play(pianoPlayer.connection, soundpath);
    }

}

function Play(connection, soundPath){
    try {
        const dispatcher = connection.play(soundPath);
        dispatcher.on("finish", finish => {
        });
    } catch (error) {
        console.log(error)
    }
}