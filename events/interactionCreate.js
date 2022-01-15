module.exports = {
	name: "interactionCreate",
	async execute(client, interaction) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		console.log(command);

		if (!command) return;
		console.log(3);
		try {
			console.log("exec", interaction.commandName);
			await command.execute(interaction);
			console.log(4);
		} catch (error) {
			console.error(error);
			return interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	},
};
