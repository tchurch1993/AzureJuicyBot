const config = require('../../../config.json');
const ValidateAndAddUser = require('../../../database/helpers/userValidation');

module.exports = async function setVoice(voiceName, memberId, guildId){

    let member = {
        id: memberId,
        guild: {
            id: guildId
        }
    }
    if(config.voicelist[voiceName] != undefined){
        ValidateAndAddUser(member, (user) => {
            var voice = config.voicelist[voiceName]
            user.TalkVoice = voice
            user.save();
        });
        //TODO:add in error handling
        return true;
    } else {
        return false;
    }
}