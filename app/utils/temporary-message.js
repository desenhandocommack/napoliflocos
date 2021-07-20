const options = { timeout: 1000 * 60 * 60 };

function send(message, content) {
  message.channel.send(content).then((m) => m.delete(options));
}

function reply(message, content) {
  message.reply(content).then((m) => m.delete(options));
}

module.exports = { send, reply, options };
