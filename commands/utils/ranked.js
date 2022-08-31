const { Client, CommandInteraction, AttachmentBuilder } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Guild = require("../../models/Guild")
module.exports = {
    slash: new SlashCommandBuilder()
        .setName('ranked')
        .setDescription("On/Off rank system 📥").addStringOption(o => o.setName("select").setRequired(true).setDescription("On/Off rank system 📥").addChoices({ name: "Enable", value: "on" }, { name: "Disable", value: "off" })),
    async execute(client, interaction) {
        let guild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if (!guild_data) await Guild.create({ guildId: interaction.guild.id })
        let newguild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if (interaction.options.getString("select") == "on") {
            if (newguild_data?.ranked == true) return interaction.text("The rank system is already enabled")
            await Guild.updateOne({ guildId: interaction.guild.id }, {
                $set: {
                    ranked: true
                }
            })
            interaction.text("Ranked Enable 📥", true)
        }
        if (interaction.options.getString("select") == "off") {
            if (newguild_data?.ranked == false) return interaction.text("The rank system is disabled")
            await Guild.updateOne({ guildId: interaction.guild.id }, {
                $set: {
                    ranked: false
                }
            })
            interaction.text("Ranked Disable 📤", true)
        }
    }
}