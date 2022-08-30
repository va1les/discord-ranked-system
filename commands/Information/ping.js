const { Client, CommandInteraction } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    slash: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Send a ping request 🏓"),
    async execute(client, interaction) {
        interaction.text(`Latency: ${Date.now() - interaction.createdTimestamp}ms`, true)
    }
}