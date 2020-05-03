const Event = require('../base/Events.js');
class GuildCreate extends Event {
	async run(guild) {
		if(!guild.available) return;
		const channel = this.client.channels.get("706376972712017930");
		await channel.send(`\`\`\`Mystbot has joined a server!\nServer Owner: ${guild.owner.user.tag}\nMember Count: ${guild.memberCount}\`\`\``);
	}
}
module.exports = GuildCreate;

