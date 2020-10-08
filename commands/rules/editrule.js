const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "editrule",
        aliases: ["editr", "changerule"],
        category: "rules",
        perms: ["MANAGE_GUILD"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send(await require("../../noArgs/rules/editrule.js")(client.guild.get(message.guild.id).prefix));
            } else if (args[0]) {
                if (isNaN(args[0]) == true) return message.channel.send("Invalid rule number");
                else if (isNaN(args[0]) == false) {
                    args[0] = parseInt(args[0]);
                    const guild = await require('../../tools/getGuild')(message);
                    if(guild.rules.enable == false) return message.channel.send("The rules is disabled")
                    if (guild.rules.rulesArr.length == 0) return message.channel.send("You haven't setup the rules yet");
                    await message.channel.send("Please supply a method (edit, delete, add)");
                    const filter = m => m.author.id == message.author.id;
                    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
                    collected = collected.first().content;
                    if (collected == "edit") {
                        let rule = guild.rules.rulesArr.find(a => a.ruleNum == args[0]);
                        if (!rule) return message.channel.send("Rule number not found");
                        message.channel.send("Please supply the new rule's content");
                        let collected1 = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
                        collected1 = collected1.first().content;
                        rule.ruleContent = collected1.toString()
                        const embed = new MessageEmbed()
                            .setTitle(`${message.guild.name}'s rules`)
                            .setColor("#eec4c6")
                            .setDescription(`${guild.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                            .setFooter(message.guild.name, message.guild.iconURL())
                            .setTimestamp(new Date())
                        const msg = await message.guild.channels.cache.get(guild.rules.channelId).messages.fetch(guild.rules.messageId);
                        if(!msg){
                            await message.guild.channels.cache.get(guild.rules.channelId).send(embed);
                        }else if(msg){
                            await msg.edit(embed);
                        }
                        await guild.save();
                        return message.channel.send(`Successfully changed the rule#${rule.ruleNum}'s content`)
                    } else if (collected == "delete") {
                        let rule = guild.rules.rulesArr.find(a => a.ruleNum == args[0]);
                        if (!rule) return message.channel.send("Rule number not found");
                        let postion = guild.rules.rulesArr.indexOf(rule);
                        guild.rules.rulesArr.splice(postion, 1);
                        await guild.save()
                        return message.channel.send(`Successfully deleted the rule#${rule.ruleNum}'s content`)
                    } else {
                        return message.channel.send('Invalid optiosn')
                    }

                }
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}