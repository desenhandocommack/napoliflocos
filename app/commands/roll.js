const diceUtils = require('dice-utils');

module.exports = {
  name: 'roll',
  description: 'Rolagem de dados',
  execute(msg) {
    const { roll } = diceUtils;
    const parsed = roll(msg.content.substr(5).trim());
    msg.reply(`${JSON.stringify(parsed.results)} (${parsed.total})`);
  },
};
