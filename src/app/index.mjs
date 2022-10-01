import { Client, Collection, GatewayIntentBits, PermissionFlagsBits } from 'discord.js';
import { createServer } from 'http';

import commandDefs from './commands/_index.mjs';
import startThread from './utils/startThread.mjs';

createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = '!';

const commands = commandDefs.reduce(
  (acc, cmd) => acc.set(cmd.name, cmd),
  new Collection()
);

client
  .once('ready', () => console.log(`${client.user.tag} is logged!`))

  // .on('debug', console.log)

  .on('messageDelete', (msg) => {
    if (msg.hasThread) {
      msg.thread.delete('Cleaning out orphan threads');
    }
  })

  .on('messageCreate', (msg) => {
    if (!msg.author.bot) {
      if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        const isAdmin = msg.member.permissions.has(
          PermissionFlagsBits.Administrator
        );

        if (
          (command === 'msg' && isAdmin) ||
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
      } else if (['🌳publicações'].includes(msg.channel.name)) {
        startThread(msg, msg.author.username);
      }
    }
  })

  .login(process.env.TOKEN);
