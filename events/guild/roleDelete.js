module.exports = async(client, role) => {
    const guild = await require('../../tools/getGuild')(client, role.guild.id);
    let chanel = guild.roles.find(c => c.id == role.id);
    if(!chanel) return;
    guild.roles.splice(chanel, 1);
    await guild.save();
}