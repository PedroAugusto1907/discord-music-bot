const { Manager } = require("magmastream");
const { lavalinkHost, lavalinkIdentifier, lavalinkPassword } = require('../config.json');

async function initMagmastream(client) {
    const nodes = [
        {
            host: lavalinkHost,
            identifier: lavalinkIdentifier,
            password: lavalinkPassword,
            port: 443,
            retryAmount: 1000,
            retrydelay: 10000,
            resumeStatus: true,
            resumeTimeout: 1000,
            secure: true,
        },
    ]

    client.manager = new Manager({
        nodes,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
            if (guild) guild.shard.send(payload);
        },
    });
}

module.exports = { initMagmastream }