const { createServer } = require('http');
const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Collection } = require('discord.js');

const client = new Client();
const commands = new Collection();
const commandsPath = join(__dirname, 'commands');
const prefix = '!';

createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    const command = require(join(commandsPath, file));
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
