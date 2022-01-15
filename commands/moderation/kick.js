const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed } = require("discord.js");
const { oneLineCommaListsAnd } = require("common-tags");

// @todo use util/noPermsEmbed (why doesn't it work?!)
const noPermsEmbed = (permissionsRequired, forBot = false) => {
	const pronoun = forBot ? "I" : "You";

	return new MessageEmbed()
		.setColor("#0099ff")
		.setTitle(`${pronoun} need more permissions!`)
		.setURL("https://polycord.ml/")
		.setDescription(
			oneLineCommaListsAnd(
				`${pronoun} need the following permissions: **${permissionsRequired}**`
			)
		);
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kicks a member!")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The member to kick")
				.setRequired(true)
		),
	async execute(interaction) {
		const user = interaction.options.getUser("target");

		if (
			!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS, true)
		) {
			return interaction.reply({
				embeds: [noPermsEmbed(["Kick Members"])],
				ephemeral: true,
			});
		}

		if (!user.kickable) {
			return interaction.reply({
				embeds: [noPermsEmbed(["Kick Members"], true)],
				ephemeral: true,
			});
		}

		user.kick();
		return interaction.reply({
			content: `**Successfully kicked** \`${user.username}\`!`,
		});
	},
};
