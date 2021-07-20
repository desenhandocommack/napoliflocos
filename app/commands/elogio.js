const rand = require('../utils/rand');

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

module.exports = {
  name: 'elogio',
  description: '',
  execute(msg) {
    const hasAttachments = msg.attachments.size === 1;

    if (hasAttachments && msg.attachments.first().url.match(/png|jpg|jpeg/i)) {
      const author = msg.author.toString();
      msg.channel.send(rand(compliments).replace('USER', author));
    }
  },
};
