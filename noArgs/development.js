const { MessageEmbed } = require("discord.js")

module.exports = function noargs() {
    let embed = new MessageEmbed()
        .setDescription("Don't touch it when you don't know what is it")
    return embed;
}