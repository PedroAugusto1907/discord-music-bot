const { Client, Events } = require('discord.js');

module.exports = {
    name: "playerDisconnect",
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, player) {
        player.destroy();
    }
}