const { createServer } = require('http');
const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Collection, Intents } = require('discord.js');

createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const commandsPath = join(__dirname, 'commands');

const prefix = '!';

const commands = readdirSync(commandsPath).reduce((acc, file) => {
  const command = require(join(commandsPath, file));
  return acc.set(command.name, command);
}, new Collection());

client
  .once('ready', () => console.log(`${client.user.tag} is logged!`))

  .on('messageCreate', (msg) => {
    if (!msg.author.bot && msg.content.startsWith(prefix)) {
      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (
        (command === 'msg' && msg.member.permissions.has('ADMINISTRATOR')) ||
        msg.channel.name === '🍧napoliflocos'
      ) {
        if (commands.has(command)) {
          try {
            commands.get(command).execute(msg, args);
          } catch (error) {
            msg.reply('Houve um erro!').then(() => console.error(error));
          }
        }
      }
    }
  })

  .login(process.env.TOKEN);
