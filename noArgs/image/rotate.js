const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Rotate")
        .setDescription(`The rotate command's aliases are : \`rotate\`, \`rotateimg\` or \`rotateimage\`\n\n **All commands:** \`${prefix}rotate [angle] [@user]\`\nGrey your/someone is avatar\n**Example**: \`\`\`\n${prefix}rotate 180 @moddy\n\`\`\``)
    return embed;
}