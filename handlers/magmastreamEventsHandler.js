const { Client } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

/** 
@param {Client} client
*/

async function loadMagmastreamEvents(client) {
    const eventsPath = path.join(__dirname, '../events/magmastream');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        client.manager.on(event.name, (...args) => event.execute(client, ...args));
    }
}

module.exports = { loadMagmastreamEvents }