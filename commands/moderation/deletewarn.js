const { WebhookClient } = require('discord.js');

module.exports = {
    config: {
        name: "deletewarn",
        aliases: ["delw", "delwarn", "delwsrn"],
        category: "moderation",
        description: "You use this command to delte a warn from a member",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/deletewarn")(guildCache.prefix));
            }
            let target = message.guild.members.cache.get(require('mention-converter')(args[0]));
            if (!target) return message.channel.send("User not found");
            if (target) {
                let reason = args.slice(1).join(" ");
                if (!reason) return message.channel.send("Please supply a __reason__");
                const guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                const targetData = guild.warn.find(t => t.userId == target.id);
                if (!targetData) {
                    const object = {
                        userId: target.id, time: 0, reason: " "
                    }
                    guild.warn.push(object);
                    await guild.save();
                    return message.channel.send("That user has no warns");
                }
                if (targetData.time == 0) return message.channel.send("That user don't have any warns to delete");
                targetData.time--;
                targetData.reason = `Deleted one warn for reason __${reason}__`;
                await guild.updateOne({ warn: guild.warn });
                guildCache.warn = guild.warn;
                let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
                if (!muterole) {
                    if (message.guild.roles.cache.size > 250) {
                        return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                    }
                    muterole = await message.guild.roles.create({
                        data: {
                            name: 'Muted',
                            color: '#000000',
                            permission: []
                        },
                        reason: reason,
                    });
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false,
                        });
                    });
                }
                if (target.roles.cache.has(muterole.id)) {
                    await target.roles.remove(muterole);
                }
                require('../../tools/function/sendMessage')(message, `One warn has been removed from **${target.user.username}**`, true)
                if (guildCache) {
                    await require('../../tools/database/saveCase')(target, message, this.config.name, reason)
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                        let embed = await require("../../logs/logs")(target, "delete warn", message, reason);
                        return channel.send(embed);
                    }
                }
                else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/deletewarn")(guildCache.prefix));
                }
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}