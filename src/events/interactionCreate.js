const logger = require('../utils/logger');
const { checkCooldown, setCooldown } = require('../utils/cooldown');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      const remaining = checkCooldown(interaction.user.id, interaction.commandName);
      if (remaining) {
        return await interaction.reply({
          content: `Please wait ${remaining}s before using \`/${interaction.commandName}\` again.`,
          ephemeral: true,
        });
      }

      // Set cooldown before executing to prevent bypass
      setCooldown(interaction.user.id, interaction.commandName);

      await command.execute(interaction);
    } catch (error) {
      logger.error(`[Error executing ${interaction.commandName}]:`, error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
