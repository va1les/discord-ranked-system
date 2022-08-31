const { Client, EmbedBuilder } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const User = require("../../models/User")
const Guild = require("../../models/Guild")
module.exports = {
    slash: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription("Shows leaders 📥"),
    async execute(client, interaction) {
        let profiles = await User.find({ guildId: interaction.guild.id })
        let sort = profiles.sort((a, b) => b.ranked.level - a.ranked.level)
        let top10 = sort.slice(0, 10)
        let Embed = new EmbedBuilder()
            .setDescription(`${top10.length ? top10.map((user, index) => `**${index + 1}.** <@${user.userId}> — 📥 ${user.ranked.level}`).join('\n') : 'Пользователей в списке нет.'}`)
            .setColor(colors.default)
        interaction.reply({ embeds: [Embed] })
    }
}