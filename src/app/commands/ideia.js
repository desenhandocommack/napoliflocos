const fs = require('fs');
const path = require('path');
const rand = require('../utils/rand');

const genders = ['masculine', 'feminine'];
const races = read('races.txt');
const classes = read('classes.txt');
const equipaments = read('equipaments.txt');

const verbs = [
  'com',
];

function read(filename) {
  const data = path.join(__dirname, '..', '..', 'data', filename);
  const txt = fs.readFileSync(data, { encoding: 'utf8' }).split('\n');

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
  const verb = rand(verbs);

  return `\nDesenha **${kind} ${clazz} ${verb} ${equip.name}**`;
}

module.exports = {
  name: 'ideia',
  description: 'Gera ideia de personagens',
  execute(msg) {
    msg.reply(makeMessage());
  },
};