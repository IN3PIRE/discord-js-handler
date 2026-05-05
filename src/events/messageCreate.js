const prefix = '!';
const { checkCooldown, setCooldown } = require('../utils/cooldown');

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

    const remaining = checkCooldown(message.author.id, commandName);
    if (remaining) {
      return message.reply(`Please wait ${remaining}s before using \`!${commandName}\` again.`)
        .then(reply => setTimeout(() => reply.delete().catch(() => {}), 5000));
    }

    // Set cooldown before executing to prevent bypass
    setCooldown(message.author.id, commandName);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error executing that command!');
    }
  },
};
