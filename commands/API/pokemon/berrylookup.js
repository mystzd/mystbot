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
		const name = data.name;


		const soilDryness = data.soil_dryness;
		const size = data.size;
		const smoothness = data.smoothness;
		const berryID = data.id;
		const firmness = data.firmness.name;

		const flavor1 = data.flavors[0].flavor.name;
		const flavor2 = data.flavors[1].flavor.name;
		const flavor3 = data.flavors[2].flavor.name;
		const flavor4 = data.flavors[3].flavor.name;
		const flavor5 = data.flavors[4].flavor.name;

		const flavor1potency = data.flavors[0].potency;
		const flavor2potency = data.flavors[1].potency;
		const flavor3potency = data.flavors[2].potency;
		const flavor4potency = data.flavors[3].potency;
		const flavor5potency = data.flavors[4].potency;

		
		const em = new RichEmbed();
		em.setTitle("Berry Stats");
		em.setDescription(`Berry name: [${name.toUpperCase()}](${url})`);
		em.addField('Berry ID', berryID);
		em.addField('Berry Smoothness', smoothness);
		em.addField('Berry Size', size);
		em.addField('Soil Dryness', soilDryness);
		em.addField('Berry Firmness?', firmness.toUpperCase());
		em.addField('Berry Flavors & Potency', `${flavor1.toUpperCase()} (Potency: ${flavor1potency}), ${flavor2.toUpperCase()} (Potency: ${flavor2potency}), ${flavor3.toUpperCase()} (Potency: ${flavor3potency}), ${flavor4.toUpperCase()} (Potency: ${flavor4potency}), ${flavor5.toUpperCase()} (Potency: ${flavor5potency})`);
		message.channel.send(em)
	    })
	    .catch(err => console.error(err));
    }
}
module.exports = berryLookup;
