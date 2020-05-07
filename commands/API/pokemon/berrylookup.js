const Command = require('../../../base/Command.js');
const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class berryLookup extends Command {
    constructor(client) {
	super(client, {
	    name: 'berrysearch',
	    aliases: ['bs'],
	    description: 'Search for a berry within the pokemon universe',
	    guildOnly: false,
	    ownerOnly: false,
	    category: "Pokemon",
	})
    }

    async run(message, args) {
	const berry = args[0];

	const url = `https://bulbapedia.bulbagarden.net/wiki/${berry}_Berry`;

	fetch(`https://pokeapi.co/api/v2/berry/${berry}`)
	    .then(res => res.json())
	    .then(data => {
		const url = `https://bulbapedia.bulbagarden.net/wiki/${berry}_Berry`;
		const name = data.item.name;
		const em = new RichEmbed();
		em.setTitle("Berry Stats");
		em.setDescription(`Berry name: [${name.toUpperCase()}](${url})`);
		console.log(data)
	    })
	    .catch(err => console.error(err));
    }
}
module.exports = berryLookup;
