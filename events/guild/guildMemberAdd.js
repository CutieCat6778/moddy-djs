const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    try {
        let guild = await require("../../tools/getGuild")(member);
        //capcha
        if (guild.capcha.enable == true && member.user.bot == false) {
            let vertifyrole = member.guild.roles.cache.find(r => r.name == "Unvertified");
            if (!vertifyrole) {
                vertifyrole = await member.guild.roles.create({
                    data: {
                        name: 'Unvertified',
                        color: '#000000',
                        permission: []
                    }
                });
                member.guild.channels.forEach(async (channel) => {
                    if(guild.capcha.whitelist.includes(channel.id))return;
                    await channel.createOverwrite(vertifyrole, {
                        READ_MESSAGES: false,
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    });
                });
            }
            if (!member.roles.cache.has(vertifyrole.id)) {
                member.roles.add(vertifyrole);
            }
            let channel = await member.createDM();
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const c = parseInt(a) + parseInt(b);
            let embed = new MessageEmbed()
                .setTitle("Capcha")
                .setDescription(`What is ${a} + ${b} ?`)
                .setFooter("You have 30 second to answer this question or you will be kicked")
            await channel.send(embed);
            const filter = m => m.author.id == member.id;
            channel.awaitMessages(filter, { max: 1, time: 30000 })
                .then(m => {
                    if (isNaN(m.first().toString()) == true || parseInt(m.first().toString()) != c) {
                        channel.send("You failed the capcha, please join to the server back to redo the capcha");
                        if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
                            let wellchannel = member.guild.channels.cache.get(guild.wellcome.channelId);
                            if (!wellchannel) return;
                            let embed = new MessageEmbed()
                                .setColor("#eec4c6")
                                .setTitle("Member failed")
                                .setThumbnail(member.user.displayAvatarURL())
                                .setDescription(`${member} just failed the capcha`)
                            wellchannel.send(embed);
                        }
                        return member.kick("The member failed the capcha");
                    } else if (isNaN(m.first().toString()) == false && parseInt(m.first().toString()) == c) {
                        let goodembed = new MessageEmbed()
                            .setColor("#eec4c6")
                            .setTitle("You passed the Capcha")
                            .setDescription(`Wellcome to **${member.guild.name}** hope you enjoy the server`)
                        channel.send(goodembed);
                        member.roles.remove(vertifyrole);
                        autoroleWellcome();
                    }
                })
        } else if (guild.capcha.enable == false || !guild.capcha || member.user.bot == true) {
            autoroleWellcome()
        }
        function autoroleWellcome() {
            //autorole
            if (guild.autorole.enable == true && guild.wellcome.channelId != " ") {
                let role = member.guild.roles.cache.get(guild.autorole.roleId);
                if (!role) return;
                if (member.roles.cache.has(role.id)) return;
                member.roles.add(role);
            }
            //wellcome
            if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
                let channel = member.guild.channels.cache.get(guild.wellcome.channelId);
                if (!channel) return;
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setTitle("Member joined")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(`${member} just joined the server \n    Member #${member.guild.memberCount}`)
                channel.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}