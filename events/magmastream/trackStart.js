const { Client, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "trackStart",
    once: false,

    /** 
    @param {Client} client
    */

    execute(client, player, track) {
        const embedMsg = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Tocando agora: ")
            .setDescription(`[${track.title} | ${formatMilliseconds(track.duration)}](${track.uri})`)
            .setThumbnail(track.artworkUrl)
            .addFields(
                { name: "Pedido por:", value: `${track.requester}` }
            );

        client.channels.cache.get(player.textChannel).send({ embeds: [embedMsg] });
    }
}

function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours}h` : '';
    const formattedMinutes = minutes > 0 || hours > 0 ? `${minutes}m` : '';
    const formattedSeconds = seconds > 0 || (hours === 0 && minutes === 0) ? `${seconds}s` : '';

    const formattedTime = `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;

    return formattedTime.trim();
}