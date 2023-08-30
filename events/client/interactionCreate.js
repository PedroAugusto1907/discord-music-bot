const { Client, Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    /** 
    @param {Client} client
    */

    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Tentativa de executar comando não encontrado: ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction, client.manager);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Erro ao tentar executar o comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Erro ao tentar executar o comando!', ephemeral: true });
            }
        }
    }
}