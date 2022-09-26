import { EmbedBuilder } from 'discord.js';

export default {
  name: 'msg',

  description: '',

  execute(msg, args) {
    if (args.length > 0) {
      const color =
        args.length > 1 && args[0].startsWith('#') ? args.shift() : '#0099ff';

      const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(args.join(' '));

      msg.channel.send({ embeds: [embed] }).then(() => msg.delete());
    }
  },
};
