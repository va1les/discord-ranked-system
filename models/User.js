const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    guildId: String,
    userId: String,
    ranked: {
        xp: { type: Number, default: 0 },
        level: { type: Number, default: 0 }
    }
})

module.exports = mongoose.model('users', userSchema);