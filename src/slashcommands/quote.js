const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random inspirational quote'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      // Handle unexpected API response
      if (!data.content || !data.author) {
        return await interaction.editReply({
          content: 'Received an unexpected response from the API. Please try again.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('Random Quote')
        .setDescription(`"${data.content}"`)
        .setFooter({ text: `— ${data.author}` })
        .setColor(0x5865F2)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Quote command error:', error);
      await interaction.editReply({
        content: 'Failed to fetch a quote. Please try again later.',
        ephemeral: true,
      });
    }
  },
};