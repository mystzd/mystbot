const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js")

class ServerInfo extends Command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      description: "Get the current server's information",
      usage: "serverinfo",
      category: "Info",
      extended: "Returns the server info of the server the command was used in.",
      aliases: ["si"]
    });
  }

  run(message, args) {
    var si = new RichEmbed();
    si.setTitle(`${message.guild.name}`);
    si.setColor("RANDOM");
    si.addField("Name Acronym", `${message.guild.nameAcronym}`);
    si.addField("Created At", `${message.guild.createdAt}`);
    si.addField("Server ID", `${message.guild.id}`);
    si.addField("Server Owner", `${message.guild.owner}`);
    si.addField("Server Owner ID", `${message.guild.owner.id}`);
    const serverregion = {
      "us-east": "Eastern United States",
      "us-south": "Southern United States",
      "us-west": "Western United States",
      "us-central": "Central United States",
      "sydney": "Sydney",
      "eu-central": "Central Europe",
      "eu-west": "Western Europe",
      "singapore": "Singapore",
      "japan": "Japan",
      "hong-kong": "Hong Kong",
      "russia": "Russia"
      }
    si.addField("Server Region", `${serverregion[message.guild.region]}`);
    const largeserver = {
      false: "Not a large server. Must be over 250 Members",
      true: "A large server! Over 250 members!"
      }
    si.addField("Large Server", `${largeserver[message.guild.large]}`);
    si.addField("Member Count", `${message.guild.memberCount}`);
    const levels = {
      0: "**None** No Security measures have been taken.",
      1: "**Low** Light Security measures have been taken. (Verified Email)",
      2: "**Moderate** Moderate Security measures have been taken. (Registered on Discord for longer than 5 minutes)",
      3: "**High** High Security measures have been taken. (Member of server for longer than 10 minutes)",
      4: "**Fort Knox** Almost inpenetrable Security measures have been taken. (Verified Phone)"
    }
    si.addField("Explicit Content Filter Level", `${levels[message.guild.explicitContentFilter]}`);
    si.addField("AFK Channel", `${message.guild.afkChannel}`);
    si.addField("Total Channels", `${message.guild.channels.size}`);
    si.setTimestamp()
    message.channel.send(si);
  }
}

module.exports = ServerInfo;
