const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "editrule",
        aliases: ["editr", "changerule"],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require("../../noArgs/rules/editrule.js")(guildCache.prefix));
            } else if (args[0]) {
                if (isNaN(args[0]) == true) return message.channel.send("Invalid rule number");
                else if (isNaN(args[0]) == false) {
                    args[0] = parseInt(args[0]);
                    const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                    if (guild.rules.enable == false) return message.channel.send("The rules is disabled")
                    if (guild.rules.rulesArr.length == 0) return message.channel.send("You haven't setup the rules yet");
                    let rule = guild.rules.rulesArr.find(a => a.ruleNum == args[0]);
                    if (!rule) return message.channel.send("Rule number not found");
                    const filter = m => m.author.id == message.author.id;
                    message.channel.send("Please supply the new rule's content");
                    let collected1 = await require('../../tools/function/collectMessage')(message, filter);
                    rule.ruleContent = collected1.content.toString()
                    const embed = new MessageEmbed()
                        .setTitle(`<:rules:774311089445535765> ${message.guild.name}'s rules`)
                        .setColor("#40598F")
                        .setDescription(`${guild.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp(new Date())
                    const msg = await message.guild.channels.cache.get(guild.rules._id).messages.fetch(guild.rules.messageId);
                    if (!msg) {
                        await message.guild.channels.cache.get(guild.rules._id).send(embed);
                    } else if (msg) {
                        await msg.edit(embed);
                    }
                    await guild.updateOne({ rules: guild.rules });
                    return require('../../tools/function/sendMessage')(message, "Successfully edited the rules.", false)
                }
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}