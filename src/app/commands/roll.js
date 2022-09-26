const { roll } = require('dice-utils');

module.exports = {
  name: 'roll',
  description: 'Rolagem de dados',
  execute(msg, args) {
    if (args && args.length > 0) {
      const parsed = roll(msg.content.substr(5).trim());
      msg.reply(`${JSON.stringify(parsed.results)} (${parsed.total})`);
    } else {
      msg.reply(roll('d6').total);
    }
  },
};
