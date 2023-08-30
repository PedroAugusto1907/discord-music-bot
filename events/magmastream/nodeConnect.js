const { Client } = require('discord.js');

module.exports = {
    name: "nodeConnect",
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, node) {
        console.log(`Node "${node.options.identifier}" conectado.`);
    }
}