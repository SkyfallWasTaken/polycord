const { SlashCommandBuilder } = require("@discordjs/builders");
const { stripIndents } = require("common-tags");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Gets the bot's ping."),
	async execute(interaction) {
		const sent = await interaction.reply({
			content: "Pinging...",
			fetchReply: true,
			ephemeral: true
		});
		interaction.editReply({
			content: stripIndents`
            		**Roundtrip latency:** ${
									sent.createdTimestamp - interaction.createdTimestamp
								}ms
            		**Websocket heartbeat:** ${interaction.client.ws.ping}ms`
		});
	},
};
