module.exports = {
  name: 'time',
  description: 'Display current server time',
  execute(message, args) {
    const time = new Date().toLocaleString();
    message.reply(`Current time: ${time}`);
  },
};