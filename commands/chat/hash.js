const bcrypt = require('bcrypt');

module.exports = {
    config: {
        name: 'hash',
        aliases: ['hashtext', 'bcrypt'],
        category: 'chat',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/chat/hash.js')(guildCache.prefix))
            } else if (args[0]) {
                const text = args.slice(0).join(" ");
                bcrypt.hash(text, 10, (err, hash) => {
                    if (err) return require('../../tools/function/error')(err, message);
                    else if (!err) {
                        return require('../../tools/function/sendMessage')(message, hash, true);
                    }
                })
            }
        } catch (e) {
            return require('../../tools/function/error')(error, message);
        }
    }
}