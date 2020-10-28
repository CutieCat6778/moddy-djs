module.exports = async function warn(message, target, reason, client) {
    try {
        const guild = await require("../tools/getGuild")(client, message.guild.id);
        const targetData = guild.warn.find(t => t.userId == target.id);
        if (!targetData) {
            const object = {
                userId: target.id, time: 0, reason: " "
            }
            guild.warn.push(object);
            await guild.save();
            return message.channel.send("That user has no warns");
        }
        if (targetData.time == 0) return message.channel.send("That user don't have any warns to delete");
        targetData.time--;
        targetData.reason = `Deleted one warn for reason __${reason}__`;
        await guild.updateOne({warn: guild.warn});
        client.guild.get(message.guild.id).warn = guild.warn;
        let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
        if (!muterole) {
            muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permission: []
                },
                reason: reason,
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false,
                });
            });
        }
        if(target.roles.cache.has(muterole.id)){
            await target.roles.remove(muterole);
        }
        return message.channel.send(`One warn has been removed from **${target.user.username}**`)
    } catch (e) {
        return console.log(e);
    }
}