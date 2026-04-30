const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random inspirational quote'),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://api.quotable.io/random', {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data?.content || !data?.author) {
        return await interaction.editReply({
          content: '❌ Quote API returned unexpected format. Please try again.',
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
        .setColor(0x5865F2)
        .setTitle('📜 Random Quote')
        .setDescription(`"${data.content}"`)
        .setFooter({ text: `— ${data.author} · Requested by ${interaction.user.tag}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      clearTimeout(timeout);
      console.error('Quote command error:', error);
      await interaction.editReply({
        content: '❌ Failed to fetch a quote. Please try again later.',
        ephemeral: true,
      });
    }
  },
};
