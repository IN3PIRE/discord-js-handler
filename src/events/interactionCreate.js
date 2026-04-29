module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    // Check for necessary bot permissions
    if (interaction.guild && !interaction.guild.members.me.permissions.has('SendMessages')) {
      return await interaction.reply({ content: '❌ I do not have permission to send messages in this server.', ephemeral: true });
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};