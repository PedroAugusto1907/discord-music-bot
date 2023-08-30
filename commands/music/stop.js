const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction, EmbedBuilder } = require('discord.js')
const { Manager } = require("magmastream")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Finaliza playlist')
    ,
    /** 
    @param {CommandInteraction} interaction
    @param {Manager} manager
    */
    async execute(interaction, manager) {
        const { member, guild } = interaction;
        const canalVoz = member.voice.channel;
        var player = manager.players.get(interaction.guildId);

        if (!player)
            return interaction.reply({ content: 'Fila está vazia', ephemeral: true });

        if (guild.members.me.voice.channelId !== canalVoz.id)
            return interaction.reply({ content: 'Você não está no mesmo canal que o bot', ephemeral: true });

        try {
            player.stop();
            player.disconnect();

            return interaction.reply({ content: 'Playlist finalizada', ephemeral: true });
        } catch (e) {
            console.log(e);

            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('Erro ao executar comando');

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}