module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    // Item #6 Fix: Check if the bot has permission to send messages in this channel
    // We use appPermissions to check the bot's specific permissions for this interaction
    if (interaction.guild && !interaction.appPermissions.has('SendMessages')) {
      try {
        return await interaction.reply({ 
          content: 'I do not have permission to send messages in this channel! Please ask an admin to update my permissions.', 
          ephemeral: true 
        });
      } catch (e) {
        // If the bot lacks permission to even reply, just log it and abort
        console.error(`[Permission Error]: Could not reply to ${interaction.commandName} in ${interaction.channelId}`);
        return;
      }
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`[Error executing ${interaction.commandName}]:`, error);
      
      // Item #7 Fix: Safe error feedback
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ 
          content: 'There was an error while executing this command!', 
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: 'There was an error while executing this command!', 
          ephemeral: true 
        });
      }
    }
  },
};