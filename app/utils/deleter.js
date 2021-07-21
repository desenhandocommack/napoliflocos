const { TextChannel } = require('discord.js');

const limit = 1000 * 60 * 60 * 1;
// const limit = 1000 * 60 * 60 * 24 * 7;

function deleteFn(client) {
  const now = Date.now();

  client.channels.cache
    .filter((c) => c.name === '🍧napoliflocos')
    .forEach(async (c) => {
      if (c instanceof TextChannel) {
        const messages = await c.messages.fetch();

        const filtred = messages.filter(
          (m) => !m.pinned && now - m.createdTimestamp > limit
        );

        c.bulkDelete(filtred);
      }
    });
}

module.exports = function deleter(client) {
  deleteFn(client);
  setInterval(() => deleteFn(client), 1000 * 60 * 60);
};
