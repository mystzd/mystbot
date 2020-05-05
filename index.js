const Discord = require("discord.js");
const klaw = require("klaw");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const path = require("path");
require("./modules/prototypes.js");
const jsonfile = require('jsonfile');


class Diamond extends Discord.Client {
  constructor(options) {
    super(options);
    this.config = require("./config.js");
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.ratelimits = new Discord.Collection();
  }
  
  loadCommand(cmdPath, name) {
    try {
      const cmd = new (require(`${cmdPath}${path.sep}${name}`))(this);
      this.commands.set(cmd.name, cmd);
      cmd.aliases.forEach(x => {
        this.aliases.set(x, cmd.name);
      });
      if(cmd.name.includes("-")) this.aliases.set(cmd.name.replace("-", ""), cmd.name);
    } catch(e) {
      console.error(e.stack);
    }
  }
}

process.on("unhandledRejection", (rejection) => console.error(rejection));

client = new Diamond({
  disabledEvents: ["TYPING_START"],
  disableEveryone: true
});
require("./modules/functions.js")(client);
const Idiot = require("idiotic-api")
client.API = new Idiot.Client("TxdGgJJl3C1jBCZYzmmd", {dev: true});
client
    .on("error", (err) => console.error(err))
    .on("warn", (w) => console.warn(w))
    .on("disconnect", () => console.warn("Bot disconnected"))
    .on("reconnecting", () => console.debug("Bot reconnecting..."))
// command logger
// put it into a json file
client.on('message', message => {
    if(!message.content.startsWith('my.')) return; //dont log messages that arent bot commands

    console.log(`Message Author: ${message.author.tag}\nChannel ID: ${message.channel.id}\nMessage Author: ${message.id}\nMessage Content: ${message.content}`); //logging for testing purposes

    const fs = require('fs');
    
    const cached = require('./cachedMessages.json');

    var messageAuthor = message.author.id;
    const messageContent = message.content

    let cachingData = {
	authorID: messageAuthor,
	content: messageContent
    };

    cached.push(cachingData);

    fs.writeFile('./cachedMessages.json', JSON.stringify(cached, null, 2), err => {
	if (err) throw err;
	console.log('wrote that hoe');
    });
    
});

(async() => {
  
  const commands = [];
  klaw("./commands")
    .on("data", (file) => {
      const cmd = path.parse(file.path);
      if(!cmd.ext || cmd.ext !== ".js") return; // ignore non js files.
      client.loadCommand(cmd.dir, cmd.name + cmd.ext);
      commands.push(cmd.name);
    })
    .on("end", () => console.log(`Loaded a total of ${commands.length} commands!`))
    .on("error", (err) => console.error(err));
    
    const events = await readdir("./events");
    console.log(`Loading a total of ${events.length} events!`);
    events.forEach(x => {
      if(!x.endsWith(".js")) return; // ignore non js files.
      const ev = require(`./events/${x}`);
      if(typeof ev !== "function") return console.warn(`./events/${x} does not export a function, aborting load...`);
      const name = x.split(".")[0];
      client.on(name, ev.bind(null, client));
      delete require.cache[require.resolve(`./events/${x}`)];
    });
    
    if(!module.parent) {
      client.login(client.config.token);
    }
    
})();
