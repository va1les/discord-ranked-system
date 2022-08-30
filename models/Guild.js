const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    guildId: String,
    ranked: { type: Boolean, default: false }
});

module.exports = mongoose.model('GuildConfigs', guildSchema);