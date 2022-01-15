const { MessageEmbed } = require("discord.js");
const { oneLineCommaListsAnd } = require("common-tags");

module.exports = (permissionsRequired, forBot = false) => {
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
