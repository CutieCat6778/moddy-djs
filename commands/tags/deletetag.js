module.exports = {
    config: {
        name: "deletetag",
        aliases: ["deltag", "deletetags"],
        category: "tags",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute (client, message, args, guildCache) {
        try{
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require('../../noArgs/tags/deletetag')(guildCache.prefix));
            } else if (args[0]) {
                const key = args.slice(0).join(" ");
                let tag = await require("../../tools/database/getTag")(key);
                if (!tag || tag.off == false) {
                    return message.channel.send(`There are no tag has key word **${key}**`);
                } else if (tag) {
                    require('../../tools/function/sendMessage')(message, `Deleted a tag has key name **${key}**`)
                    return await tag.remove();
                }
            }
        }catch(e) {
            return await require("../../tools/function/error")(e, message);
        }
    }
}