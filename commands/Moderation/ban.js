const Command = require('../../base/Command.js');
const { RichEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

class ban extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			description: 'Ban a user from the server.',
			usage: 'my.ban [@user]',
			guildOnly: true,
			ownerOnly: false,
			category: "Moderation"
		});
	}

	async run(message, args) {

		const permissions = new Permissions([
			'BAN_MEMBERS',
			'EMBED_LINKS'
		]);

		if(!permissions) return message.channel.send(`I lack the ${permissions} permission(s).`);

		const user = message.mentions.users.first();

		if(!user) return message.channel.send('Please mention a user.');

		if(user.id === message.author.id) return message.channel.send('Please do not attempt to ban yourself.');

		const member = message.guild.member(user);

		if(!member) return message.channel.send('The user in not in the server.');

		member
		.ban({
			reason: `${user.tag} was banned by ${message.author.tag}`
		})
		.then(() => {
			const bm = new RichEmbed();
			bm.setTitle(`${user.tag} was banned.`);
			bm.setDescription(`${message.author.tag} pulled the trigger.`);
			bm.setFooter(`Mystbot v0.01`);
			bm.setTimestamp();
			message.channel.send(bm);
		})
		.catch(err => {
			message.channel.send('Unable to ban the user due to role hierarchy. Please put my role above the selected user.');
			console.error(err)
		});
	}
}
module.exports = ban;
