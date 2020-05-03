
module.exports = async(client, message) => {
  
  if(message.author.bot) return; // Always ignore bots.
  
  const prefix = client.config.prefix;
  
  // Prefix and perm checks.
  if(message.content.indexOf(prefix) !== 0) return;
  
  if(message.guild) if(!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) return;
  
  // Arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Getting the command
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if(!cmd) return; // Fail silently
  
  // If cmd is disabed exit early with a message.
  if(cmd.disabled) return message.reply("Sorry, This command is disabled");
  
  // Command Checks.
  if(message.guild && cmd.permission && !message.member.permissions.has(cmd.permission) && message.author.id !== client.config.ownerID) return message.reply(`You do not have permissions to use this command, you need \`${cmd.permission.replace("_", " ").toProperCase()}\``).catch(console.error);
  
  if(message.channel.type === "dm" && cmd.guildOnly) return message.channel.send("This command can only be used in a server");
  
  if(cmd.clientPermission && !message.guild.me.permissions.has(cmd.permission)) return message.reply(`I don't have \`${cmd.permission.replace("_", " ").toProperCase()}\` permission to do this.`);
  
  if(cmd.ownerOnly && message.author.id !== client.config.ownerID && !cmd.allowed.includes(message.author.id)) return message.reply("This command is for owner only!");
  
  if(cmd.allowed.length > 0 && !cmd.allowed.includes(message.author.id) && message.author.id !== client.config.ownerID) return message.reply("You don't have permissions to use this");
  
  // Cooldowns.
  const rl = await client.ratelimit(message, cmd.name, cmd.cooldown);
  if(typeof rl === "string") return message.channel.send(`Please wait ${rl} to run this command again.`);
  
  // Run it if all conditions met.
  try {
    cmd.run(message, args);
  } catch(e) {
    console.error(e);
  }
};