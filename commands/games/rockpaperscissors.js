const { SlashCommandBuilder } = require("@discordjs/builders");
const { stripIndents } = require("common-tags");
const { MessageActionRow, MessageButton } = require("discord.js");

const row = new MessageActionRow().addComponents(
	new MessageButton().setCustomId("rock").setLabel("👊").setStyle("PRIMARY"),
	new MessageButton().setCustomId("paper").setLabel("🖐").setStyle("PRIMARY"),
	new MessageButton().setCustomId("scissors").setLabel("✂").setStyle("PRIMARY")
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rock-paper-scissors")
		.setDescription("Play Rock Paper Scissors"),
	async execute(interaction) {
		await interaction.reply({
			content: stripIndents`
			**Rock Paper Scissors**

			Choose **:fist: Rock, :hand_splayed: Paper, or :scissors: Scissors!**
			`,
			fetchReply: true,
			components: [row],
		});

		
	},
};
