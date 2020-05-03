const { RichEmbed } = require('discord.js');
module.export = async(guild) => {
	if(!guild.available) return;

	const channel = this.client.channels.get("706378435773202432");

	const em = new RichEmbed();
	em.setTitle("mystbot left a server");
	em.setDescription(guild.name);
	em.setColor(0x00FFFF);
	em.setThumbnail(guild.iconURL());
	em.addField('Owner', guild.owner.user.tag);
	em.addField('Member Count', guild.memberCount);
	em.setFooter(`Mystbot v0.01`);
	em.setTimestamp();

	channel.send(em);
}
