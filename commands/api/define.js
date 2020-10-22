const { MessageEmbed } = require('discord.js');
const request = require('request');
module.exports = {
    config: {
        name: "define",
        aliases: ["dict"],
        category: "api",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try{
            if (!args[0]) {
                let embed = await require('../../noArgs/api/define.js')(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            } else if (args[0]) {
                url = `https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`;
                url = encodeURI(url);
                request({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Content-Type': "application/json",
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0'
                    }
                }, function (err, response, body) {
                    if (err) {
                        return console.error(err)
                    }
                    body = JSON.parse(body);
                    if(body.message) return message.channel.send(body.message);
                    if(!body[0]) return message.channel.send("No information found")
                    let embed = new MessageEmbed()
                        .setColor("#669fd2")
                        .setTitle(`${body[0].word} - ${body[0].phonetics[0].text}`)
                        .setDescription(`${body[0].meanings[0].partOfSpeech}\n\n**Definition**\n${body[0].meanings[0].definitions[0].definition}\n\n**Synonyms**\n${body[0].meanings[0].definitions[0].synonyms.join(", ")}\n\n**Example**\n${body[0].meanings[0].definitions[0].example ? body[0].meanings[0].definitions[0].example : "none"}`)
                    return message.channel.send(embed);
                })
            }
        }catch(e) {
            return require('../../tools/error')(e, message);
        }
        
    }
}