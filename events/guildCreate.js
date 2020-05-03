/*
 * pollen5/miyako
 * on github
 */
const { RichEmbed } = require('discord.js');
module.exports = async(guild) => {
	if(!guild.available) return;
	const channel = this.client.channels.get("706376972712017930");
	if(!guild.owner && guild.ownerID) await guild.members.fetch(guild.ownerID);

	const em = new RichEmbed()
	em.setTitle("mystbot joined a new server");
	em.setDescription(guild.name);
	em.setColor(0xFF00FF);
	em.setThumbnail(guild.iconURL());
	em.addField('Owner', guild.owner.user.tag);
	em.addField('Member Count', guild.memberCount);
	em.setFooter(`Mystbot v0.01`);
	em.setTimestamp();

	await channel.send({ em }).catch(() => null);
}
