const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const Command = require('../../base/Command.js');

class messageLookup extends Command {
    constructor(client) {
	super(client, {
	    name: 'messagelookup',
	    description: 'Look up a message from a server that the bot is in.',
	    aliases: ['ml'],
	    extended: 'Look up a message from a server that the bot can see. This only works with messages that the bot has access to see. Beware! This command can take quite a bit of time to use, especially if the channel message history is big.',
	    guildOnly: false,
	    ownerOnly: false,
	    category: 'Info'
	})
    }

    async run(message, client) {
	const mentionedMember = message.mentions.members.first()

	if(!mentionedMember) return message.channel.send("Please mention a user");

	if(mentionedMember === message.author.id) return message.channel.send('Please do not mention yourself. If you wish to retrieve your messages, please do not mention anyone.');
	
	const filter = message => mentionedMember;
	const options = { max: 5000, maxMatches: 5000 }
	let collector = new Discord.MessageCollector(message.channel, filter, options);
	console.log(collector);
	

    }
}

module.exports = messageLookup;
