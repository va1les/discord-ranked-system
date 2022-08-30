const { Client, CommandInteraction, AttachmentBuilder } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const User = require("../../models/User")
const Guild = require("../../models/Guild")
module.exports = {
    slash: new SlashCommandBuilder()
        .setName('rank')
        .setDescription("Shows ur rank 📥").addUserOption(o => o.setName("user").setDescription("View another user's level 📥")),
    async execute(client, interaction) {
        let guild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if(!guild_data) await Guild.create({ guildId: interaction.guild.id })
        let newguild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if (newguild_data?.ranked == false) return interaction.text("Ranked off", true)
        const target = interaction.options.getUser("user") || interaction.user;
        let member = await interaction.guild.members.fetch(target.id)
        let olddata = await User.findOne({ guildId: interaction.guild.id, userId: target.id })
        if (!olddata) await User.create({ guildId: interaction.guild.id, userId: target.id })
        let data = await User.findOne({ guildId: interaction.guild.id, userId: target.id })
        const canvacord = require("canvacord");
        const background = "https://catherineasquithgallery.com/uploads/posts/2021-02/1612941220_66-p-fon-avatarka-chernii-krasnii-88.jpg"
        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL())
            .setCurrentXP(typeof data?.ranked?.xp === "object" ? 0 : data?.ranked?.xp)
            .setRequiredXP(10000)
            .setStatus(member.presence?.status || "offline")
            .setProgressBar("#FFFFFF", "COLOR")
            .setLevel(typeof data?.ranked?.level === "object" ? 0 : data?.ranked?.level)
            .setRank(typeof data?.ranked?.level === "object" ? 0 : data?.ranked?.level)
            .setUsername(`${target.username}`)
            .setDiscriminator(`${target.discriminator}`)
            .setBackground("IMAGE", background);

        rank.build()
            .then(data => {
                const attachment = new AttachmentBuilder(data, "RankCard.png");
                interaction.reply({ files: [attachment] })
            })
    }
}