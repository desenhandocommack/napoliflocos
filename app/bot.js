const http = require('http');
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const path = require('path');
const client = new Client();
const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

http.createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

fs.readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const command = require(path.join(commandsPath, file));
    commands.set(command.name, command);
  });

client
  .once('ready', () => console.log(`Logged in as ${client.user.tag}!`))
  .on('message', async (msg) => {
    const args = msg.content.slice('!').trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!msg.author.bot && ['867104422671417394'].includes(msg.channel.id)) {
      if (commands.has(command)) {
        try {
          commands.get(command).execute(msg, args);
        } catch (error) {
          console.error(error);
          msg.reply('Houve um erro!');
        }
      }
    }
  })
  .login(process.env.TOKEN);
