const { Client, Events } = require('discord.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, oldState, newState) {
        const guildId = oldState.guild.id;
        const player = client.manager.players.get(guildId);

        if (player && client.channels.cache.get(player.voiceChannel).members.size === 1) {
            player.disconnect();
            player.destroy();
        }
    }
}