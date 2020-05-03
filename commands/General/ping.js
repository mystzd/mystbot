const Command = require("../../base/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Pong!",
      usage: "ping",
      extended: "Pong! checks websocket latency."
    });
  }
  
  run(message, args) {
    message.channel.send("Pong!")
      .then(msg => {
        msg.edit(`Pong! Latency: **${msg.createdTimestamp - message.createdTimestamp}** ms, API Latency: **${Math.floor(this.client.ping)}** ms`);
      });
  }
}

module.exports = Ping;
