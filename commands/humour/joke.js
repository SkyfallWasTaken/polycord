const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios").default;
const sample = require("lodash.sample");

const jokeCache = [];

const initialJokeEmbed = new MessageEmbed()
	.setColor("#0099ff")
	.setTitle("Here's your joke!")
	.setURL("https://polycord.ml")
	.setTimestamp();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("joke")
		.setDescription("Gives you a random joke!"),
	async execute(interaction) {
		axios
			.get(
				`https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,racist,sexist,explicit&type=single&safe-mode`
			)
			.then(function (response) {
				// handle success
				const joke = response.data.joke;

				if (jokeCache.length >= 50) {
					jokeCache.pop();
				}

				jokeCache.push(joke);

				const jokeEmbed = initialJokeEmbed
					.setDescription(joke)

				return interaction.reply({ embeds: [jokeEmbed] });
			})
			.catch(function (error) {
				// handle error
				console.log(error);

				if (jokeCache.length < 8) {
					return interaction.reply({
						content: "Sorry, an error occured while getting your joke!",
						ephemeral: true,
					});
				} else {
					console.log("using joke cache");

					const jokeEmbed = initialJokeEmbed
						.setDescription(sample(jokeCache))
						.setFooter({
							text: "Joke from cache as API is not reachable, so it may be stale, sorry! =(",
						});

					return interaction.reply({ embeds: [jokeEmbed] });
				}
			});
	},
};
