const { createServer } = require('http');
const { readdirSync } = require('fs');
const { join } = require('path');
const { Client, Collection, Intents } = require('discord.js');
const deleter = require('./app/utils/deleter');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const commands = new Collection();
const commandsPath = join(__dirname, 'app', 'commands');
const prefix = '!';

createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

readdirSync(commandsPath).forEach((file) => {
  const command = require(join(commandsPath, file));
  commands.set(command.name, command);
});

client
  .once('ready', async () => {
    console.log(`${client.user.tag} is logged!`);

    deleter(client);
  })
  .on('messageCreate', async (msg) => {
    if (!msg.author.bot && msg.content.startsWith(prefix)) {
      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (
        msg.member.roles.cache.has('856888498837913653') &&
        command === 'msg'
      ) {
        run(msg, command, args);
      } else if (msg.channel.name === '🍧napoliflocos') {
        run(msg, command, args);
      }
    }
  })
  .login(process.env.TOKEN);

function run(msg, command, args) {
  if (commands.has(command)) {
    try {
      commands.get(command).execute(msg, args);
    } catch (error) {
      msg.reply('Houve um erro!').then(() => console.error(error));
    }
  }
}
