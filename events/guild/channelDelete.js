module.exports = async(client, channel) => {
    if(channel.type == "dm") return;
    const guild = await require('../../tools/getGuild')(client, channel.guild.id);
    let chanel = guild.channels.find(c => c.id == channel.id);
    if(!chanel) return;
    guild.channels.splice(chanel, 1);
    await guild.save();
}