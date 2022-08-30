const { EmbedBuilder } = require("@discordjs/builders");
const User = require("../models/User")
const Guild = require("../models/Guild")
module.exports = {
    name: 'interactionCreate',

    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;

        let guild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if (!guild_data) await Guild.create({ guildId: interaction.guild.id })
        let newguild_data = await Guild.findOne({ guildId: interaction.guild.id })
        if (newguild_data?.ranked == true) {
            let data = await User.findOne({ guildId: interaction.guild.id, userId: interaction.member.id })
            if (!data) await User.create({ guildId: interaction.guild.id, userId: interaction.member.id })
            // let newdata = await User.findOne({ guildId: message.guild.id, userId: message.user.id })
            await User.updateOne({ guildId: interaction.guild.id, userId: interaction.member.id }, {
                $inc: { "ranked.xp": +10 }
            })
            let newdata = await User.findOne({ guildId: interaction.guild.id, userId: interaction.member.id })
            if (newdata?.ranked?.xp >= 10000) {
                await User.updateOne({ guildId: interaction.guild.id, userId: interaction.member.id }, {
                    $inc: { "ranked.level": +1 },
                    $set: {
                        'ranked.xp': 0
                    }
                })
                let newdata = await User.findOne({ guildId: message.guild.id, userId: message.member.id })
                message.channel.send(`${message.author} вы подняли уровень с ${data.ranked.level} на ${newdata.ranked.level}`)
            }
        }
        const cmd = client.commands.get(interaction.commandName)
        if (!cmd) return;

        console.log(`[LOGS] `.green + `[${interaction.commandName.toUpperCase()}]`.blue.bold + ` ${interaction.user.tag}`.yellow + ` used the command.`.grey)

        interaction.text = async (text, booalean) => interaction.reply({ content: text, ephemeral: booalean });
        interaction.embed = async (author, title, description, booalean) => interaction.reply({ embeds: [new EmbedBuilder({ author: author ? { name: interaction.user.tag, icon_url: interaction.user.displayAvatarURL() } : { name: null, icon_url: null }, title: title || null, description: description, color: colors.default })], ephemeral: booalean })

        cmd.execute(client, interaction)
    }
}