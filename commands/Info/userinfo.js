const Command = require("../../base/Command.js");
const { RichEmbed } = require("discord.js");
const { MessageEmbed } = require("discord.js");


class UserInfo extends Command {
	constructor(client) {
    		super(client, {
      			name: "userinfo",
      			description: "Get a users information",
      			usage: "userinfo",
      			category: "Info",
      			extended: "Grab yours or another users information.",
      			aliases: ['ui']
    		});
  	}

	async run(message, args) {
    		//const user = message.guild.members.find("displayName", args.join(" ")) || message.guild.members.get(args[0]);
    		//if(!user) return message.channel.send("Unable to find user! Please make sure if they have a nickname, to search by the nickname, not the username!");
    		//if(!args.join("") || !args[0]) return message.channel.send("Please provide a user to search for...");
		const user = message.mentions.users.first() || message.author;
		const h = await this.client.hastebin(`Username: ${user.username}#${user.discriminator}\nIs the user a bot? ${user.bot}\nDefault Avatar URL: ${user.defaultAvatarURL}\nUser Flags: ${user.flags}\nUser ID: ${user.id}\nLast Message Sent by the User: ${user.lastMessage.content ? user.lastMessage.content : "The User's last message was an Image, or an Embed"}\nLast Message Channel ID: ${user.lastMessageChannelID}\nLast Message ID: ${user.lastMessageID}\nUser Created At: ${user.createdAt}\nUser Created At Timestamp: ${user.createdTimestamp}\nUser Locale: ${user.locale}\nIs this user a partial? ${user.partial}\nUsers current presence: ${user.presence}\nIs the user an official Discord System User? ${user.system}\nAvatar Link: ${user.avatarURL}`, "js");
    		let thumb = user.displayAvatarURL;
    		const ui = new RichEmbed();
    		ui.setTitle(`${user.username} User Info`);
    		ui.setColor("RANDOM");
    		ui.setThumbnail(thumb);
    		ui.addField("User Name", `**${user.username}#${user.discriminator}**`);
    		if(user.nickname) {
      			ui.addField("Nickname", `**${user.nickname}**`);
    		}
    		ui.addField("User ID", `${user.id}`);
    		const normie  = {
      			"online": "Online",
      			"idle": "Idle",
      			"dnd": "Do Not Disturb",
      			"offline": "Offline or Invisible"
      		}
    		ui.addField("User Status", `${normie[user.presence.status]}`);
    		if(user.presence.game) {
      			ui.addField("Playing:", user.presence.game.name);
    		}
    		ui.addField("Account Created At", `${user.createdAt}`);
    		const nitro = {
      			"true": "Yes",
      			"false": "No"
    		}
    		if(!user.lastMessage) {
      			ui.addField("Last Message Sent", "Mystbot hasn't cached the data from that user. Or, that user just sent an embed.");
    		} else {
      			ui.addField("Last Message Sent", `${user.lastMessage.content ? user.lastMessage.content : "The User's last message was an Image, or an Embed"}`);
    		}
    		ui.addField("Last Message ID", `${user.lastMessageID}`);
    		const yn = {
      			"false": "No",
      			"true": "Yes"
    		}
    		ui.addField("Can I Ban You?", `${yn[message.member.bannable]}`);
    		ui.addField("Can I Kick You?", `${yn[message.member.kickable]}`);
    		ui.addField("Highest Role", `${user.highestRole}`);
    		if(message.member.nickname === null) {
      			ui.addField("Nickname?", "This user does not have a nickname.");
    		} else {
        		ui.addField("Nickname?", `${message.member.nickname}`);
    		}
		ui.setTimestamp();
		ui.setDescription(`Extended Info can be found [here](${h})`);

    		message.channel.send(ui);
	}
}

module.exports = UserInfo;
