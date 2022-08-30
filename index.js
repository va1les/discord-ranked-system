const { Client, Collection } = require("discord.js");
const fs = require('fs');
require('dotenv').config();
require('colors');
const client = new Client({
    intents: 3276799
});

global.colors = {
    default: 16777215,
    success: 10025880,
    error: 13458524,
};
global.emoji = {
    success: '✅',
    danger: '⚠️',
    error: '❌',
}

client.commands = new Collection();
client.commands_array = [];

require('./handlers/events').init(client);

client.login(process.env.TOKEN);

module.exports = client;