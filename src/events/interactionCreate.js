const { checkCooldown, setCooldown } = require('../utils/cooldown');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      // Check cooldown without setting it yet
      const remaining = checkCooldown(interaction.user.id, interaction.commandName, false);
      if (remaining) {
        return await interaction.reply({
          content: `Please wait ${remaining}s before using \`/${interaction.commandName}\` again.`,
          ephemeral: true,
        });
      }

      // Execute command first
      await command.execute(interaction);

      // Only set cooldown after successful execution
      setCooldown(interaction.user.id, interaction.commandName);
    } catch (error) {
      console.error(`[Error executing ${interaction.commandName}]:`, error);

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
