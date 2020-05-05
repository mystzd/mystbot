const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const os = require("os");

class BotInfo extends Command {
    constructor(client) {
    	    super(client, {
      		name: "botinfo",
      		description: "Get some helpful information about the bot.",
      		usage: "botinfo",
      		category: "Info",
      		extended: "Get the basic bot information, changelogs, commands run, and much more with this awesome command.",
      		aliases: ['bi']
   	    });
    }

    async run(message, args) {
	const h = await this.client.hastebin(`Bot Uptime: ${Math.floor(client.uptime / 60000)} minutes\n`);  
	var bi = new RichEmbed();
	bi.setTitle("Mystbot Info");
	bi.setDescription(`Extended information [here](${h})`, "js");
	bi.setColor("RANDOM");
	bi.addField("Creator", "mystzd#2940");
	bi.addField("Guilds Currently In", `${client.guilds.size}`);
	bi.addField("Total Channels Watching", `${client.channels.size}`);
	bi.addField("Total Users Watching", `${client.users.size}`);
	bi.addField("Ping Time", `API Latency: **${Math.floor(this.client.ping)}** ms`);
	bi.addField("Last Three Ping Times", ` ${client.pings}ms`);
	bi.addField("Total Emoji Access", `${client.emojis.size}`);
	bi.addField("RAM Usage", `${((os.totalmem() - os.freemem()).toFixed(2) / 1073741824).toFixed(2)} GB / ${(os.totalmem() / 1073741824).toFixed(2)} GB`);
	bi.addField('GitHub', 'https://github.com/mystzd/mystbot');
	message.channel.send(bi);
  }
}

module.exports = BotInfo;
