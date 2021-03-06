const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av", "ava"],
        category: "informations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute (client, message, args, guildCache) {
        try {
            let user;
            if (!args[0]) user = message.member;
            if(args[0]){
                user = message.guild.members.cache.get(require('mention-converter')(args[0]));
                if(!user) return message.channel.send("Member not found");
            }
            let embed = new MessageEmbed()
            .setColor("#40598F")
                .setTitle(`<:avatar:777500599297507358> ${user.displayName}'s avatar`)
                .setDescription(`[Click here for link](${user.user.displayAvatarURL({ size: 256, format: "png" })})`)
                .setImage(user.user.displayAvatarURL({ size: 256 }))
                .setTimestamp()
            require('../../tools/function/sendMessage')(message, embed);
        }catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}