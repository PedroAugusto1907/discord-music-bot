const { Client, Events } = require('discord.js');

module.exports = {
    name: Events.Raw,
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, data) {
        client.manager.updateVoiceState(data);
    }
}