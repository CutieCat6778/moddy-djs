const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'taginfo',
        aliases: ["tag-info", "tag_info"],
        category: "tags",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require('../../noArgs/tags/taginfo')(guildCache.prefix));
            } else if (args[0]) {
                let key = args.slice(0).join(" ");
                const tag = await require("../../tools/database/getTag")(key);
                if (!tag) return message.channel.send(`There are no tag has key word **${key}**`)
                else if (tag) {
                    const user = await client.users.fetch(tag.userId);
                    let embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setTitle(`<:tags:774348022598860860> ${user.username}#${user.discriminator}`)
                        .addField("Key word", `${tag.key.slice(0, 1).toUpperCase() + tag.key.slice(1)}`, true)
                        .addField("Date", require("ms")((new Date() - tag.date), { long: true }) + " ago", true)
                        .setTimestamp()
                    return require('../../tools/function/sendMessage')(message, embed);
                }
            }
        } catch (e) {
            return await require("../../tools/function/error")(e, message);
        }

    }
}