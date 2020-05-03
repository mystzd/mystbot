

module.exports = (client) => {
  console.log(`
#####{ Bot Ready! }#####
Username: ${client.user.tag}
Bot Id: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
Channels: ${client.channels.size}
########################`.trim());
  console.log("mystbot is in: " + client.guilds.size + " servers.");
  client.user.setActivity(`my.help | ${client.guilds.size} guilds!`);
  
};
