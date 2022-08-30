const mongoose = require('mongoose')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        require('../handlers/commands').init(client)
        await mongoose.connect(process.env.MONGO_URI, { keepAlive: true }).then(_ => console.log(`[MONGOOSE] `.green + 'The database is connected!'.blue.bold))

        console.log('[APP]'.green + ' The application has been successfully downloaded!'.blue.bold)
        setInterval(() => { client.user.setPresence({ status: `online`, activities: [{ name: `Spotify | ${new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', timeStyle: 'short' })} МСК`, type: 2 }] }) }, 15 * 1000)

    }
}