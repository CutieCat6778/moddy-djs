const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#5780cd")
        .setTitle("Members ")
        .setDescription("Members category some utility and funny commands and make the server more happy ")
        .setTimestamp()
    return embed;
}