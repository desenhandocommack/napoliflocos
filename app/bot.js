const http = require('http');
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const path = require('path');
const client = new Client();
const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const prefix = '!';
const { options } = require('./utils/temporary-message');

http.createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

fs.readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const command = require(path.join(commandsPath, file));
    commands.set(command.name, command);
  });

client
  .once('ready', () => console.log(`${client.user.tag} is logged!`))
  .on('message', async (msg) => {
    if (
      !msg.author.bot &&
      msg.content.startsWith(prefix) &&
      msg.channel.name === '🍧napoliflocos'
    ) {
      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      msg.delete(options);

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
