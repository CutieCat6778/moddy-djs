let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Reset rule")
        .setDescription(`The reset rule command's aliases are : \`resetrule\` or \`resetr\`\n
            **Reset rule**: \`${prefix} resetrule\`
                Reset rule (delete it)
            **Example**: 
            \`${prefix} resetrule\`
        `)
    return embed;
}