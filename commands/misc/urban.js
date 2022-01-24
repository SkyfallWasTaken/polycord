// @ts-nocheck
const { SlashCommandBuilder } = require("@discordjs/builders");
const cachios = require("cachios").default;
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const trim = (str, max) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("urban")
		.setDescription("Looks up a term on the Urban Dictionary.")
		.addStringOption((option) =>
			option.setName("term").setDescription("Your term.").setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const term = interaction.options.getString("term");
		const query = new URLSearchParams({ term });

		cachios
			.get(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(function (response) {
				if (response.data.list.length === 0) {
					return interaction.editReply({
						content: `Term **${term}** not found.`,
						epheremal: true,
					});
				}

				const [answer] = response.data.list;

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setCustomId("thumbs_up")
						.setLabel(`👍 ${answer.thumbs_up}`)
						.setStyle("SECONDARY")
						.setDisabled(true),
					new MessageButton()
						.setCustomId("thumbs_down")
						.setLabel(`👎 ${answer.thumbs_down}`)
						.setStyle("SECONDARY")
						.setDisabled(true)
				);

				const embed = new MessageEmbed()
					.setColor("#EFFF00")
					.setTitle(answer.word)
					.setURL(answer.permalink)
					.addFields(
						{
							name: "Definition",
							value: trim(
								answer.definition.replace(
									/\[([^\]]+)\]/g,
									`[$1](https://www.urbandictionary.com/define.php?term=$1)`
								),
								1024
							),
						},
						{ name: "Example", value: trim(answer.example, 1024) }
					);

				interaction.editReply({ embeds: [embed], components: [row] });
			});
	},
};
