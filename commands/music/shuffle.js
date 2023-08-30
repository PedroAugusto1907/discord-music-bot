const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction } = require('discord.js')
const { Manager } = require("magmastream")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Bagunça a playlist')
    ,
    /** 
    @param {CommandInteraction} interaction
    @param {Manager} manager
    */
    async execute(interaction, manager) {
        const { member, guild,} = interaction;
        const canalVoz = member.voice.channel;
        let player = manager.players.get(interaction.guildId);

        if (!player)
            return interaction.reply({ content: 'Fila está vazia', ephemeral: true });

        if (guild.members.me.voice.channelId !== canalVoz.id)
            return interaction.reply({ content: 'Você não está no mesmo canal que o bot', ephemeral: true });

        try {
            player.queue.shuffle();

            return interaction.reply({ content: 'Playlist embaralhada', ephemeral: true });
        } catch (e) {
            console.log(e);

            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('Erro ao executar comando');

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}