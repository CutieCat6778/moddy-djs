const { readdirSync } = require("fs")

module.exports = async(client) => {
    try {
        const cmds = [];
        const cmd = [];
		await ['client', 'guild'].forEach(async a => await readdirSync('./events/'+a).map(b => cmds.push(b) && cmd.push(b)));
        const load = dirs => {
            const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dirs}/${file}`);
                let eName = file.split('.')[0];
                client.on(eName, evt.bind(null, client));
                if(!cmds.includes(eName+".js")){
                    console.log(`Missing ${eName+".js"}`)
				}else if(cmds.includes(eName+".js")){
                    cmd.splice(cmd.indexOf(eName+".js"), 1);
				}
            };
        };
        load('client');
        load('guild');
        let value = true;
        console.log('--- LOADING ALL EVENTS ---')
        cmds.forEach(a => {
			if(!cmd.includes(a)){
				console.log(`${a.slice(0, 1).toUpperCase() + a.slice(1)}: ✅`)
			}else if(cmd.includes(a)){
				console.log(`${a.slice(0, 1).toUpperCase() + a.slice(1)}: ❌`)
                value = false;
			}
		})
        return value;
    } catch (e) {
        return require("../tools/function/error")(e, undefined)
    }
};