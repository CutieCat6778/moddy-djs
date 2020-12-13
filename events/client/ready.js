const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js");
const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
const dbl = require('../../dbl/server');

module.exports = async (client) => {
    try {
        await client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await require("../../functions/guildCache")(client);
        await dbl(client);
        if (!process.env.hook) {
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`)
                .setTimestamp()
            await hook.send(embed);
        }
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
        client.setInterval(async () => {
            await dbl.postStats(client.guilds.size);
        }, 21600000)
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }

}
