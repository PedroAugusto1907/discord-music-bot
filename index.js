const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { initMagmastream } = require('./magmastream/initMagmastream');
const { loadCommands } = require('./handlers/commandsHandler');
const { loadClientEvents } = require('./handlers/clientEventsHandler');
const { loadMagmastreamEvents } = require('./handlers/magmastreamEventsHandler');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

initMagmastream(client);
loadCommands(client);
loadClientEvents(client);
loadMagmastreamEvents(client);

client.login(token);

["unhandledRejection", "uncaughtException", "uncaughtExceptionMonitor"].forEach((event) => {
    process.on(event, (error) => {
        console.error(`Erro não tratado no evento ${event}:`, error);
    });
});