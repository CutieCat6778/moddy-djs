const Guild = require("../models/guilds");
module.exports = async function getGuild(client, id) {
    const guild = await Guild.findOne({ _id: id }).catch(e => require('./error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(client, id);
        return guild
    }
    if (!guild.prefix) {
        guild.prefix = "mod";
        await guild.save();
        getGuild(id);
    }
    if (!guild.case) {
        guild.case = [];
        await guild.save();
        getGuild(id);
    } if (!guild.logs) {
        guild.logs = {
            id: " ", enable: false, token: " "
        }
        await guild.save();
        getGuild(id);
    } if (!guild.capcha) {
        guild.capcha = {
            "channels": [], "enable": false
        };
        await guild.save();
        getGuild(id);
    } if (!guild.textfilter) {
        guild.textfilter = {
            "enable": false,
            "badwords": {
                "whitelist": [], "blacklist": [], "enable": false
            }, "links": false, "cap": false
        };
        await guild.save();
        getGuild(id);
    } if (!guild.rules) {
        guild.rules = { "enable": false, "channelId": " ", "messageId": " ", "rulesArr": [] };
        await guild.save();
        getGuild(id);
    }
    return guild;
}