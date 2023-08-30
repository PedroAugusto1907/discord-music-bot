const { Client, Events, ActivityType } = require('discord.js');
const { clientId } = require('../../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,

    /** 
    @param {Client} client
    */

    execute(client) {
        client.user.setActivity('cabeça de gelo', { type: ActivityType.Listening });
        console.log(`TUDO PRONTO! Logado como ${client.user.tag}`);

        try {
            client.manager.init(clientId);
            console.log(`Magmastream iniciado`);
        } catch (e) {
            console.log(`Erro ao iniciar Magmastream: ${e}`);
        }
    }
}