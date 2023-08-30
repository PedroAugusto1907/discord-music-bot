const { Client } = require('discord.js');

module.exports = {
    name: "nodeError",
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, node, error) {
        console.log(`Node "${node.options.identifier}" encontrou um erro: ${error.message}.`);
    }
}