const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const diceUtils = require('dice-utils');
const path = require('path');

const client = new Discord.Client();
const articles = { masculine: 'um', feminine: 'uma' };
const genders = ['masculine', 'feminine'];
const races = read('races.txt');
const classes = read('classes.txt');
const adjectives = read('adjectives.txt');
const equipaments = read('equipaments.txt');

http.createServer((_, res) => res.end('Estou funcionando!')).listen(3000);

client.once('ready', () => console.log(`Logged in as ${client.user.tag}!`));

function rand(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function read(filename) {
  const txt = fs.readFileSync(path.join(__dirname, 'data', filename), { encoding: 'utf8' }).split('\n');

  const header = txt[0].split('|').map((r) => r.trim().toLowerCase());

  return txt.slice(2).reduce((acc, race) => {
    const [m, f] = race.split('|').map((r) => r.trim());
    acc.push({ [header[0]]: m, [header[1]]: f ? f : m });
    return acc;
  }, []);
}

function makeMessage() {
  const gender = rand(genders);
  const kind = rand(races)[gender];
  const clazz = rand(classes)[gender];
  const equip = rand(equipaments);
  const adj = rand(adjectives)[equip.gender].toLowerCase();
  const article = articles[gender];

  return `\nDesenha ${article} **${kind} ${clazz} ${rand(verbs)} ${equip.name} ${adj}**`;
}

const verbs = [
  'fazendo',
  'criando',
  'construindo',
  'limpando',
  'quebrando',
  'montando',
  'xingando',
  'gritando com',
  'brincando com',
  'chorando com',
  'sorrindo com',
  'correndo com',
  'andando com',
  'caindo com',
  'pulando com',
  'saltando com',
  'falando com',
  'pensando em',
  'com',
  'segurando',
  'empunhando',
  'derrubando',
  'jogando',
  'arremessando',
];

const positiveAnswer = ['De nada!', 'Que isso amigo, foi um prazer te ajudar!', 'Eu que agradeço', 'Incrivel! Bate aqui ✋'];

const negativeAnswer = ['Então vamos mais uma vez', 'Acho que você está inventando desculpas'];

const compliments = [
  'Que lindo, USER. Você fez sem ajuda?',
  'Parabéns, USER, nunca vi desenho mais fofo que este!',
  'Parabéns, USER, nunca vi desenho mais lindo que este!',
  'Parabéns, USER, nunca vi desenho mais incrível que este!',
  'Parabéns, USER, nunca vi desenho mais estonteante que este!',
  'Parabéns, USER, nunca vi desenho mais magnífico que este!',
  'Parabéns, USER, nunca vi desenho mais estupendo que este!',
  'Parabéns, USER, nunca vi desenho mais perfeito que este!',
  'Parabéns, USER, nunca vi desenho mais original que este!',
  'Muito bem, USER, você está ficando cada dia melhor!',
  'Muito bem, USER, você está se superando a cada dia!',
  'Que incrível, USER! Você parece profissional!',
  'Vou ser sincero com você, USER, este é o melhor trabalho que já vi até hoje!',
  'Olha, USER, já vi desenho bom, mas o seu supera todos!',
  'Meus parabéns, USER, você tem um futuro brilhante!',
];

client.on('message', async (msg) => {
  if (msg.author.bot || !['867104422671417394'].includes(msg.channel.id)) {
    return;
  }

  // gerador de ideias
  else if (msg.content.toLocaleLowerCase().match(/não gostei/i)) {
    const answer = rand(negativeAnswer);
    msg.reply(`${answer}${answer === negativeAnswer[0] ? makeMessage() : ''}`);
  } else if (msg.content.toLocaleLowerCase().match(/obrigado|obg|valeu/i)) {
    msg.reply(rand(positiveAnswer));
  } else if (msg.content.match(/(preciso|sem).*id[eé]ia/i)) {
    msg.reply(makeMessage());
  }

  // outros
  else if (msg.content.startsWith('!elogio') && msg.attachments.size === 1 && msg.attachments.first().url.match(/png|jpg|jpeg/i)) {
    msg.channel.send(rand(compliments).replace('USER', msg.author.toString()));
  } else if (msg.content.startsWith('t') && msg.member.roles.cache.find((r) => r.name === '🛡ADM')) {
    const ch = client.channels.cache.find((ch) => ch.id === '867104422671417394');
    const MESSAGES = require('./data/channel-welcome/messages');
    MESSAGES.forEach((m) => ch.send({ files: [m.header] }).then(() => m.messages.forEach((x) => ch.send(x === '' ? '⠀' : x))));
  }

  // rolador de dados
  else if (msg.content.startsWith('!roll')) {
    const { roll } = diceUtils;
    const parsed = roll(msg.content.substr(5).trim());
    msg.reply(`${JSON.stringify(parsed.results)} (${parsed.total})`);
  }

  // mensagens simples
  else if (msg.content.toLowerCase().match(/napolitano/i) && msg.content.includes('flocos')) {
    msg.reply('Hummm... Excelente combinação!');
  } else if (msg.content.toLowerCase().match(/flocos/i)) {
    msg.reply('Sabe o que vai bem com sorvete de Flocos? Isso mesmo, um Napolitano!');
  } else if (msg.content.toLowerCase().match(/napolitano/i)) {
    msg.reply('Adoro! Com Flocos, melhor ainda!');
  }
});

client.login(process.env.TOKEN);
