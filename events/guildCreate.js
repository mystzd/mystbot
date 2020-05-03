module.exports = async(message, guild) => {
	if(!guild.available) return;
	const channel = this.client.channels.get("706376972712017930");
	if(!guild.owner && guild.ownerID) await guild.members.fetch(guild.ownerID);
	message.channel.send(`\`\`\`Mystbot has joined a server!\nServer Owner: ${guild.owner.user.tag}\nMember Count: ${guild.memberCount}\`\`\``);
}

