const {MessageEmbed} = require("discord.js");

module.exports = {
    config: {
        name: "search",
        aliases: ["google"],
        category: "api",
        perms: ["SEND_MESSAGES"]
    },
    async execute (client, message, args) {
        try{
            if (!args[0]) return message.channel.send("Please supply a __topic__ you want to search for");
            let topic = args.slice(0).join("+");
            const url = `https://www.google.com/search?q=${topic}`;
            let embed = new MessageEmbed()
                .setTitle("Link for the result")
                .setDescription(`[Click here](${url})`)
                .setTimestamp()
            return message.channel.send(embed);
        }catch(e) {
            require("../../tools/error")(e, message);
        }
    }
}