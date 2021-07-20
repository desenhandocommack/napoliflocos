const diceUtils = require('dice-utils');
const { reply } = require('../utils/temporary-message');

module.exports = {
  name: 'roll',
  description: 'Rolagem de dados',
  execute(msg) {
    const { roll } = diceUtils;
    const parsed = roll(msg.content.substr(5).trim());
    reply(msg, `${JSON.stringify(parsed.results)} (${parsed.total})`);
  },
};
