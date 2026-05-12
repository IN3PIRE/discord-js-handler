const { Collection } = require('discord.js');
const cooldowns = new Collection();

const { checkCooldown, setCooldown } = require('../utils/cooldown');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    // Cooldown logic
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

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
