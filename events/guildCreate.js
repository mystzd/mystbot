module.exports = async(message, guild, client) => {
	if(!guild.available) return;
	const channel = client.channels.get('706376972712017930');
	channel.send(`\`\`\`Mystbot has joined a server.\nServer name: ${guild.name}\nServer Owner: ${guild.owner.user.tag}\nTotal Members: ${guild.memberCount}\`\`\``);
}
