const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Unmute")
        .setDescription(`The unmute command's aliases are : \`unmute\`, \`unm\` or \`unmutee\`\n
            **Pernamently unmute**: \`${prefix} unmute <@user> <reason>\`
                Unmute a member so he can talk after that
            **Example**: 
            \`${prefix} unmute @steve he is good now\`
        `)
    return embed;
}