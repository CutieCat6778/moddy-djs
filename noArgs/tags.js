const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
                .setColor("#40598F")

        .setTitle("Tags ")
        .setDescription("Tags category is like a public archive in there you can save your data but public")
        .setTimestamp()
    return embed;
}