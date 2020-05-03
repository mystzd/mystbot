const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");

class RoleInfo extends Command {
  constructor(client) {
    super(client, {
      name: "roleinfo",
      description: "Get some info about a role",
      usage: "roleinfo <mention role> OR <role name>",
      category: "Info",
      extended: "Get loads of information off of this one sweet command! Mainly about a role, ya know?"
    });
  }

  run(message, args) {
    const role = message.mentions.roles.first() || message.guild.roles.find("name", args.join(" ")) || message.guild.roles.get(args[0]);
    if(!role) return message.channel.send("Role not found. Please check your spelling, and other related issues.");
    if(!args.join("") || !args[0]) return message.channel.send("Please provide a role to search for!");
    var ri = new RichEmbed();
    ri.setTitle(`${role.name} Info`);
    ri.setColor(role.color);
    ri.addField("Role Name", `${role.name}`);
    ri.addField("Role ID", `${role.id}`);
    ri.addField("Role Hex Color", `${role.hexColor}`);
    ri.addField("Members in This Role", `${role.members.map(m => m.user.username).join(", ") || "No users have this role :/" }`);
    ri.addField("Role Permissions", `${role.permissions}`);
    ri.addField("Role Mentionable?", `${role.mentionable}`);
    ri.addField("Role Position", `${role.position}`);
    //ri.addField("Hoisted Role", `${role.hoistRole}`);
    message.channel.send(ri);
  }
}

module.exports = RoleInfo;
