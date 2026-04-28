const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Fetch a random inspirational quote'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle('Random Quote')
        .setDescription(data.content)
        .setFooter({ text: data.author })
        .setColor(0x5865F2)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Quote command error:', error);
      await interaction.editReply({
        content: 'Failed to fetch quote. Please try again.',
        ephemeral: true,
      });
    }
  },
};
