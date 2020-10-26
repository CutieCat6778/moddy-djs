const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js")
module.exports = async (client) => {
    try {
        await client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await require("../../functions/guildCache")(client);
        if (!process.env.hook) {
            const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
            const embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`)
                .setTimestamp()
            await hook.send(embed);
        }
        await require('../../dashboard/server')(client);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }

}
