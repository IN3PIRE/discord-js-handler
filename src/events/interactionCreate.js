const logger = require('../utils/logger');
const { checkCooldown, setCooldown } = require('../utils/cooldown');
const { sanitizeInput } = require('../utils/sanitize');
const { validatePermissions } = require('../middleware/permissions');
const { recordCommand } = require('../utils/statsCollector');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    // Sanitize string inputs automatically
    if (interaction.options && typeof interaction.options.data !== 'undefined') {
      for (const option of interaction.options.data) {
        if (option.type === 3 && typeof option.value === 'string') { // STRING type
          option.value = sanitizeInput(option.value);
        }
      }
    }

    // Validate permissions
    if (!validatePermissions(interaction, command)) return;

    const startTime = Date.now();

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

      recordCommand(interaction.commandName, interaction.user.id, Date.now() - startTime, true);
    } catch (error) {
      recordCommand(interaction.commandName, interaction.user.id, Date.now() - startTime, false);
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
