const { roll } = require('dice-utils');

module.exports = {
  name: 'roll',
  description: 'Rolagem de dados',
  execute(msg, args) {
    const parsed =
      args && args.length > 0 ? roll(msg.content.substr(5).trim()) : roll('d6');
    msg.reply(`${JSON.stringify(parsed.results)} (${parsed.total})`);
  },
};
