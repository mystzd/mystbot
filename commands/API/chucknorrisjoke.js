const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Command = require('../../base/Command.js');

class chuckNorrisJoke extends Command {
    constructor(client) {
	super(client, {
	    name: 'chuckjoke',
	    description: 'Get a random chuck norris joke',
	    aliases: ['cnj'],
	    guildOnly: false,
	    ownerOnly: false,
	    category: 'API Commands',
	})
    }

    async run(message, args) {
	fetch('https://api.chucknorris.io/jokes/random')
	    .then(res => res.json())
	    .then(data => {
		const em = new RichEmbed();
		em.setTitle("Here, have a Chuck Norris joke.");
		em.setDescription(data.value)
		em.setThumbnail(data.icon_url)
		em.setFooter(`Mystbot v0.032`)
		em.setTimestamp();

		message.channel.send(em);
	    })
	    .catch(err => console.error(err))
    }
}
module.exports = chuckNorrisJoke;
