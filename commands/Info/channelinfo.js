const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class ChannelInfo extends Command {
  constructor(client) {
    super(client, {
      name: "channelinfo",
      description: "Get the channels information",
      category: "Info",
      usage: "channelinfo",
      extended: "Get the channels information"
    });
  }

  run(message, args) {
    const channel = message.guild.channels.find("name", args.join(" ")) || message.guild.channels.get(args[0]);
    if(!channel) return message.channel.send("Unable to find channel!");
    if(channel.type === "voice") return message.channel.send("Please Search for only Voice Channels!");
    if(!args.join("") || !args[0]) return message.channel.send("Please provide a channel to search for...");
    var ci = new RichEmbed();
    ci.setTitle(`${message.channel.name}`);
    ci.setColor("RANDOM");
    const deletable = {
      "false": "No",
      "true": "Yes"
    }
    ci.addField("Can You Delete this Channel?", `${deletable[message.channel.deletable]}`);
    ci.addField("Position", `${message.channel.position}`);
    ci.addField("Channel Topic", `${message.channel.topic}`);
    const nsfw = {
      "false": "No",
      "true": "Yes"
    }
    ci.addField("Parent Catagory", `${message.channel.parent}`);
    const typeofchannel = {
      "text": "A Text Channel",
      "voice": "A Voice Channel",
      "dm": "Direct Message Channel",
      "group": "A Group Message Channel",
      "category": "Channel Category",
      "news" : "Guild News Channel",
      "store" : "Guild Store Channel"
    }
    ci.addField("Type of Channel", `${typeofchannel[message.channel.type]}`);
    ci.addField("NFSW Channel?", `${nsfw[message.channel.nsfw]}`);
    ci.setTimestamp();
    ci.setFooter(`Channel Number #${message.channel.position}`);
    message.channel.send(ci);
  }

}


module.exports = ChannelInfo;
