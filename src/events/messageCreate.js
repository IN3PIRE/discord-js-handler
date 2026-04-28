const prefix = '!';

module.exports = {
  name: 'messageCreate',
  execute(message) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    
    const command = message.client.prefixCommands.get(commandName);
    if (!command) {
      return message.reply(`Unknown command: \`${commandName}\`. Type \`!help\` to see available commands.`);
    }
    
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error executing that command!');
    }
  },
};