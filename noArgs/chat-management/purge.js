const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("purge")
        .setDescription(`The purge command's aliases are : \`purge\`, \`clear\` or \`delmsg\`\n\n **Purge**: \`${prefix}purge <lines or max> <reason>\`\nThe bot will delete a number of lines of messages that you gave\n **User messages purge**: \`${prefix}purge <@user> <lines or max> <reason>\`\nThe bot will delete a number of lines of messages that you gave\n**Example**: \`\`\`\n${prefix}purge 10\n\`\`\``)
    return embed;
}