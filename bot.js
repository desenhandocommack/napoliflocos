const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const articles = { masculine: 'um', feminine: 'uma' };
const genders = ['masculine', 'feminine'];
const races = read('races.txt');
const classes = read('classes.txt');
const adjectives = read('adjectives.txt');
const equipaments = read('equipaments.txt');

app.get('/', (request, response) => {
  console.log(Date.now() + ' Ping Received');
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function rand(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function read(filename) {
  const txt = fs
    .readFileSync(path.join(__dirname, 'data', filename), {
      encoding: 'utf8'
    })
    .split('\n');

  const header = txt[0].split('|').map(r => r.trim().toLowerCase());

  return txt.slice(2).reduce((acc, race) => {
    const [m, f] = race.split('|').map(r => r.trim());
    acc.push({ [header[0]]: m, [header[1]]: f ? f : m });
    return acc;
  }, []);
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
  'arremessando'
];

client.on('message', msg => {
  if (msg.author.bot || msg.channel.name.toLowerCase() !== 'napoliflocos') {
    return;
  } else if (msg.content.match(/(preciso|sem).*id[eé]ia/g)) {
    const gender = rand(genders);
    const kind = rand(races)[gender];
    const clazz = rand(classes)[gender];
    const equip = rand(equipaments);
    const adj = rand(adjectives)[equip.gender].toLowerCase();
    const article = articles[gender];

    msg.reply(
      `\nDesenha ${article} **${kind} ${clazz} ${rand(verbs)} ${
        equip.name
      } ${adj}**`
    );
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

client.login(process.env.TOKEN);
