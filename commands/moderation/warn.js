const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: "warn",
        aliases: ["w", "wsrn", "attention"],
        category: "moderation",
        description: "You use this command to warn a member",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES"]
    },
    async execute (client, message, args) {
        try {
            if(!args[0]){
                return message.reply(require("../../noArgs/moderation/warn")(client.guild.get(message.guild.id).prefix));
            }
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("User not found");
            if (target) {
                if (args[0]) {
                    let reason = args.slice(1).join(" ");
                    if (!reason) return message.channel.send("Please supply a __reason__");
                    await require("../../functions/warn")(message, target, reason, args[0], client)
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "warn", message, reason, client);
                            return channel.send(embed);
                        }
                    }
                }
                else {
                    return message.reply(require("../../noArgs/moderation/warn")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}