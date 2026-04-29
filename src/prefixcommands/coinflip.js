module.exports = {
  name: 'coinflip',
  description: 'Flip a coin',
  execute(message, args) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '⬆️' : '⬇️';
    message.reply(`🪙 ${emoji} **${result}** ${emoji}`);
  },
};