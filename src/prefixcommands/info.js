module.exports = {
  name: 'info',
  description: 'Show bot information',
  execute(message, args) {
    message.reply('This is a Discord.js v14 bot with slash and prefix commands!');
  },
};