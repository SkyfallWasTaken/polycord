const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("snake")
		.setDescription("Play Snake!"),
	async execute(interaction) {
		
	},
};
