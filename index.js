const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

// @ts-ignore
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		// @ts-ignore
		client.commands.set(command.name, command);
	}
}

client.once("ready", () => {
	console.log("Ready!");
});

client.login(token);
