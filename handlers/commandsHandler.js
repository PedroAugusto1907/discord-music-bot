const { Client, REST, Routes, Collection } = require('discord.js')
const { clientId, token } = require('../config.json')
const fs = require('node:fs')
const path = require('node:path')

/** 
@param {Client} client
*/

async function loadCommands(client) {
    const commands = []
    client.commands = new Collection();
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] O comando do arquivo ${filePath} não possui a propriedade "data" ou "execute, favor corrigir.`);
            }
        }
    }

    const rest = new REST().setToken(token);

    try {
        console.log(`Iniciando aplicação com ${commands.length} (/) comandos.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Aplicação iniciada com ${data.length} (/) comandos.`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { loadCommands }