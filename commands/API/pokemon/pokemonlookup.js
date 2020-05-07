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

		const stat1 = data.stats[0].stat.name;
		const stat2 = data.stats[1].stat.name;
		const stat3 = data.stats[2].stat.name;
		const stat4 = data.stats[3].stat.name;
		const stat5 = data.stats[4].stat.name;
		const stat6 = data.stats[5].stat.name;

		const stat1value = data.stats[0].base_stat;
		const stat2value = data.stats[1].base_stat;
		const stat3value = data.stats[2].base_stat;
		const stat4value = data.stats[3].base_stat;
		const stat5value = data.stats[4].base_stat;
		const stat6value = data.stats[5].base_stat;

		const type = data.types[0].type.name;

		const ability = data.abilities[0].ability.name;

		const em = new RichEmbed();
		em.setTitle('Pokemon Stats');
		em.setDescription(`Name: [${name.toUpperCase()}](${url})`);
		em.addField('Pokedex Number', data.id);
		em.addField('Pokemon Type', `${type.toUpperCase()}`);
		em.addField('Pokemon Ability', `${ability.toUpperCase()}`);
		em.addField('Pokemon Base Stats', `${stat1.toUpperCase()}: ${stat1value}, ${stat2.toUpperCase()}: ${stat2value}, ${stat3.toUpperCase()}: ${stat3value}, ${stat4.toUpperCase()}: ${stat4value}, ${stat5.toUpperCase()}: ${stat5value}, ${stat6.toUpperCase()}: ${stat6value}`);
		em.addField('Weight', `${weight}kg`);
		em.setThumbnail(data.sprites.front_default);

		message.channel.send(em)
	    })
    }
}
module.exports = pokemonLookup
