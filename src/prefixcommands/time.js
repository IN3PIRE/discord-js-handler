module.exports = {
  name: 'time',
  description: 'Display current server time',
  execute(message, args) {
    
    const unixTimestamp = Math.floor(Date.now() / 1000);
    message.reply(`Current time: <t:${unixTimestamp}:F>`);
  },
};