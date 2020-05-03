const Command = require("../../base/Command.js");

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Invite mystbot to your guild.",
      usage: "invite",
      extended: "Invite mystbot with all nessecary permissions."
    });
  }
  
  run(message, args) {
    message.channel.send("Here ya go!")
        .then(msg => {
          msg.edit(`https://discordapp.com/api/oauth2/authorize?client_id=450419305671032832&permissions=8&scope=bot`)
        });
  }
}

module.exports = Invite;
