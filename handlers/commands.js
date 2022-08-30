const fs = require('fs')
module.exports.init = async (client) => {
    for (let folder of fs.readdirSync('./commands')) {
        for (let file of fs.readdirSync(`./commands/${folder}`).filter(x => x.endsWith(".js"))) {
            const cmd = require(`../commands/${folder}/${file}`)
            client.commands_array.push(cmd.slash.toJSON())
            client.commands.set(cmd.slash.toJSON().name, cmd)
        }
    }
    console.log("[EVENT] ".green + "Commands Handler Started".blue.bold);
    client.application.commands.set(client.commands_array)
}