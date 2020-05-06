const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Command = require('../../../base/Command.js');

class pokemonLookup extends Command {
    constructor(client) {
	super(client, {
	    name: 'pokesearch',
	    description: 'Look up a pokemon!',
	    aliases: ['ps'],
	    guildOnly: false,
	    ownerOnly: false,
	    category: 'Pokemon',
	    extended: 'Search some information about any pokemon. (Correct spelling is required.'
	})
    }

    async run(message, args) {

	let pokemon = args[0];
	
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
	    .then(res => res.json())
	    .then(data => {
		const name = data.species.name;
		const url = `https://pokemondb.net/pokedex/${pokemon}`;
		const weight = data.weight / 10;
		const em = new RichEmbed();
		em.setTitle('Pokemon Stats');
		em.setDescription(`Name: [${name.toUpperCase()}](${url})`);
		em.addField('Pokedox Number', data.id);
		em.addField('Weight (kg)', weight);
		em.setThumbnail(data.sprites.front_default);

		message.channel.send(em)
	    })
    }
}
module.exports = pokemonLookup
