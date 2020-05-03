const Command = require("../../base/Command.js");
const Discord = require('discord.js');
const { RichEmbed } = require("discord.js");

class Hastebin extends Command {
  constructor(client) {
    super(client, {
      name: "hastebin",
      description: "Make a file in Hastebin.",
      usage: "hastebin <code>",
      category: "Misc",
      extended: "Make an easy to use hastebin file.",
      aliases: ["hbin", "haste", "bin"],
      cooldown: 3
    });
  }
  
  async run(message, args) {
    const h = await this.client.hastebin(args.join(" "), "js");
    const hastEmb = new RichEmbed()
      .setTitle("Your hastebin link.")
      .setDescription(h)
      .setTimestamp()
      .setFooter(`Hastbin made by: ${message.author.tag}`);
    message.channel.send({ embed: hastEmb });
  }
}

module.exports = Hastebin;
