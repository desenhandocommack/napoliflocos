const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', msg => {
  if (msg.author.bot) {
    return;
  } else if (
    msg.content.toLowerCase().includes('napolitano') &&
    msg.content.includes('flocos')
  ) {
    msg.reply('Hummm... Excelente combinação!');
  } else if (msg.content.toLowerCase().includes('flocos')) {
    msg.reply(
      'Sabe o que vai bem com sorvete de Flocos? Isso mesmo, um Napolitano!'
    );
  } else if (msg.content.toLowerCase().includes('napolitano')) {
    msg.reply('Adoro! Com Flocos, melhor ainda!');
  }
});

client.login('NjUzNDcyNzg4ODIwMDAwNzc5.Xe3gJw.mMFmcYqlf3V4Yk3ZmZG2b4Jz04s');
