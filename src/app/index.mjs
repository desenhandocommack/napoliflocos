import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { createServer } from 'http';

import commandDefs from './commands/_index.mjs';

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
