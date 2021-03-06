const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "serverinfo",
        aliases: ["sinfo", "serverdesc", "guildinfo"],
        category: "informations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`<:information:777490082289680395> ${message.guild.name} server information`)
                .setThumbnail(message.guild.iconURL())
                .addField("Guild Name", `${message.guild.name}`, true)
                .addField("Guild Id", `${message.guild.id}`, true)
                .addField("Guild Owner", `${message.guild.owner}`, true)
                .addField("Member Count", `${message.guild.memberCount}`, true)
                .addField("Roles Count", `${message.guild.roles.cache.size}`, true)
                .addField("Bots Count", `${message.guild.members.cache.filter(b => b.user.bot).size}`, true)
                .addField("System channel", `${message.guild.systemChannel}`, true)
                .addField("Server region", `${message.guild.region}`, true)
                .addField("Vertification level", `${message.guild.verificationLevel.toLowerCase()}`, true)
                .addField("Vertifed:", `${message.guild.verified}`, true)
                .addField("Server created on", `${new Date(message.guild.createdAt).toLocaleString()}`, true)
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                .setTimestamp()
            return require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }

    }
}