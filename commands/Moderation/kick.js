const Command = require('../../base/Command.js')
const { RichEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

class kick extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			description: 'Kick a user from the server.',
			usage: 'my.kick [@user]',
			guildOnly: true,
			ownerOnly: false,
			category: "Moderation"
		});
	}

	async run(message, args) {

		const permissions = new Permissions([
			'KICK_MEMBERS',
			'EMBED_LINKS'
		]);

		if(!permissions) return message.channel.send(`I lack the ${permissions} permission(s) to run this command`);

		const user = message.mentions.users.first();

		if(!user) return message.channel.send('Please mention a user.');

		if(!user.id === message.author.id) return message.channel.send('Please do not attempt to kick yourself.');

		if(client.highestRole < user.highestRole) return message.channel.send('Unable to kick the user. This is due to role hierarchy. If you want to eliminate this problem, please put my role above the inteded users role.');

		const member = message.guild.member(user);

		if(!member) return message.channel.send('That user is not in the server.');

		member
		.kick(`${user.tag} was kicked by ${message.author.tag}`)
		.then(() => {
			const km = new RichEmbed();
			km.setColor(0xFF00FF);
			km.setTitle(`${user.tag} has been kicked!`);
			km.setDescription(`${user.tag} was kicked by ${message.author.tag}`);
			km.setFooter(`mystbot v0.01`);
			km.setTimestamp()
			message.channel.send(km);
		});
	}
}
module.exports = kick;
