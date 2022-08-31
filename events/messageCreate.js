const mongoose = require('mongoose')
const User = require("../models/User")
const Guild = require("../models/Guild")
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;
        let guild_data = await Guild.findOne({ guildId: message.guild.id })
        if (!guild_data) await Guild.create({ guildId: message.guild.id })
        let newguild_data = await Guild.findOne({ guildId: message.guild.id })
        if (newguild_data?.ranked == true) {
            let data = await User.findOne({ guildId: message.guild.id, userId: message.member.id })
            if (!data) await User.create({ guildId: message.guild.id, userId: message.member.id })
            // let newdata = await User.findOne({ guildId: message.guild.id, userId: message.user.id })
            await User.updateOne({ guildId: message.guild.id, userId: message.member.id }, {
                $inc: { "ranked.xp": +100 }
            })
            let newdata = await User.findOne({ guildId: message.guild.id, userId: message.member.id })
            if (newdata?.ranked?.xp >= 10000) {
                await User.updateOne({ guildId: message.guild.id, userId: message.member.id }, {
                    $inc: { "ranked.level": +1 },
                    $set: {
                        'ranked.xp': 0
                    }
                })
                let newdata = await User.findOne({ guildId: message.guild.id, userId: message.member.id })
                message.channel.send(`${message.author} вы подняли уровень с ${data.ranked.level} на ${newdata.ranked.level}`)
            }
        }
    }
}