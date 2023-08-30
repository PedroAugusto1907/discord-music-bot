const { SlashCommandBuilder } = require('@discordjs/builders')
const { CommandInteraction, EmbedBuilder } = require('discord.js')
const { Manager } = require("magmastream")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Tocar música / playlist')
        .addStringOption(option => {
            return option.setName('musica')
                .setDescription('Link / Nome da música')
                .setRequired(true)
        })
    ,
    /** 
    @param {CommandInteraction} interaction
    @param {Manager} manager
    */

    async execute(interaction, manager) {
        const { options, member, guild } = interaction;
        const canalVoz = member.voice.channel;

        if (!canalVoz)
            return interaction.reply({ content: 'Você não está em um canal de voz', ephemeral: true });

        if (guild.members.me.voice.channelId && (canalVoz.id !== guild.members.me.voice.channelId))
            return interaction.reply({ content: 'Já estou sendo usado em outro canal', ephemeral: true });

        try {
            await interaction.reply({ content: 'Pesquisando', ephemeral: true });

            const query = options.get('musica').value;

            var res = await manager.search(query);

            if (res.loadType === 'error') {
                return interaction.editReply({ content: 'Erro durante a busca' });
            } else if (res.loadType === 'empty') {
                return interaction.editReply({ content: 'Nenhuma música encontrada' });
            }

            let player;

            if (manager.players.has(interaction.guildId)) {
                player = manager.players.get(interaction.guildId);
            } else {
                player = manager.create({
                    guild: interaction.guildId,
                    voiceChannel: canalVoz.id,
                    textChannel: interaction.channelId,
                    volume: 100,
                    selfDeafen: true
                });

                player.connect();
            }

            if (res.loadType === 'playlist') {
                interaction.followUp({ content: `Playlist adicionada com ${res.playlist.tracks.length + 1} músicas` });

                for (var track of res.playlist.tracks) {
                    track.requester = interaction.member.user;
                    player.queue.add(track);
                }
            } else {
                res.tracks[0].requester = interaction.member.user;
                player.queue.add(res.tracks[0]);

                interaction.editReply({ content: `Música ${res.tracks[0].title} adicionada` });
            }

            if (!player.playing && player.queue.current) {
                player.play();
            }

        } catch (e) {
            console.log(e)
            const errorEmbed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('Erro ao executar comando');

            return interaction.editReply({ content: '', embeds: [errorEmbed], ephemeral: true });
        }
    }
}