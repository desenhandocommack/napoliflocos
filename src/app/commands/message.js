const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'msg',
  description: '',
  execute(msg, args) {
    if (args.length > 0) {
      const color =
        args.length > 1 && args[0].startsWith('#') ? args.shift() : '#0099ff';

      const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(args.join(' '));

      msg.channel.send({ embeds: [embed] }).then(() => msg.delete());
    }
  },
};
