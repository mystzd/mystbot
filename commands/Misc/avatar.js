const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      description: "Get someone's avatar!",
      usage: "avatar [@user]",
      category: "Misc",
      extended: "Returns avatar of someone or yours",
      aliases: ["pfp"]
    });
  }
  
  run(message, args) {
    const user = message.mentions.users.first() || message.author;
    let av = user.displayAvatarURL;
    if(!av.includes("size")) av += "?size=2048";
    else av = av.replace("1028", "2048");
    const embed = new RichEmbed()
      .setTitle(`${user.tag}'s avatar`)
      .setImage(av)
      .setFooter(`Requested by ${message.author.tag}`);
      
    message.channel.send({ embed });
  }
}

module.exports = Avatar;
