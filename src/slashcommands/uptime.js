const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Display bot uptime'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const embed = new EmbedBuilder()
        .setTitle('Bot Uptime')
        .setDescription(`\`\`\`${hours}h ${minutes}m ${seconds}s\`\`\``)
        .setColor('Green');

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Uptime command error:', error);
      await interaction.editReply({
        content: 'Failed to fetch uptime. Please try again.',
        ephemeral: true,
      });
    }
  },
};