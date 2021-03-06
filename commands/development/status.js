const { exec } = require('child_process');

module.exports = {
    config: {
        name: "status",
        aliases: ["pm2stat"],
        perms: ["CREATOR"],
        category: "development"
    },
    async execute(client, message, args, guildCache) {
        try {
            const input = "pm2 status";
            exec(input, async (error, stdout, stderr) => {
                const date1 = new Date();
                if (error || stderr) {
                    const output = await require("../../tools/string/textsplit")(error, true);
                    if(!output) output = await require("../../tools/string/textsplit")(stderr, true);
                    if(!output) output = "nothing";
                    await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                    return message.channel.send(output);
                }
                const output = await require("../../tools/string/textsplit")(stdout, true);
                await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                message.channel.send(output);
            });
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}