const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "search",
        aliases: ["google"],
        category: "api",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) return message.channel.send("Please supply a __topic__ you want to search for");
            let topic = args.slice(0).join("+");
            const url = `https://www.google.com/search?q=${topic}`;
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("<:google:774311088958341120> Link for the result")
                .setDescription(`[Click here](${url})`)
                .setTimestamp()
            return require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            require("../../tools/function/error")(e, message);
        }
    }
}