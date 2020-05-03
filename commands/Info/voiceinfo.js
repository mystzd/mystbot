const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class VoiceInfo extends Command {
  constructor(client) {
    super(client, {
      name: "voiceinfo",
      description: "Get some pretty decent info of a voice channel.",
      usage: "voiceinfo [voice channel name]",
      category: "Info",
      extended: "Get some lit stats about who is in the vc, what the bitrate is, mostly nerd stuff lol, thats why there is so much info commands lol."
    });
  }

  run(message, args) {
    const channel = message.guild.channels.find("name", args.join(" ")) || message.guild.channels.get(args[0]);
    if(!channel) return message.channel.send("Unable to find channel!");
    if(channel.type === "text") return message.channel.send("Please Search for only Voice Channels!");
    if(!args.join("") || !args[0]) return message.channel.send("Please provide a channel to search for...");
    var vc = new RichEmbed();
    vc.setTitle(`${channel.name}`);
    vc.setColor("RANDOM");
    vc.addField("Channel Name", `${channel.name}`);
    vc.addField("Channel ID", `${channel.id}`);
    vc.addField("Bitrate", `${channel.bitrate}`);
    vc.addField("Channel Position", `${channel.position + 1}`);
    const yn = {
      "true": "Yes",
      "false": "No"
    }
    vc.addField("Is the VC Full?", `${yn[channel.full]}`);
    //vc.addField("Voice Region", `${channel.voiceRegion}`);
    //vc.addField("Is the VC Custom?", `${yn[channel.custom]}`);
    //vc.addField("Is the region deprecated?", `${yn[channel.deprecated]}`);
    //vc.addField("Is the region VIP Only?", `${yn[channel.vip]}`);
    vc.setTimestamp();
    message.channel.send(vc);

  }
}

module.exports = VoiceInfo;
