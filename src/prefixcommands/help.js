module.exports = {
  name: 'help',
  description: 'Show help information',
  execute(message, args) {
    message.reply('Available prefix commands: !help, !info');
  },
};