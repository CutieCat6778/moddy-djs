const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mypermissions",
        aliases: ["myperms", "mperms"],
        category: "informations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`<:permission:777500648500625449> ${message.member.displayName}'s permissions`)
                .setDescription(`\`\`\`css\n${message.member.permissions.toArray().join("\n")}\n\`\`\``)
                .setTimestamp()
            return require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}