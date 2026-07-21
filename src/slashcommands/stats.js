const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getStats } = require('../utils/statsCollector');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Display bot command usage statistics'),
  async execute(interaction) {
    const stats = getStats();

    const days = Math.floor(stats.uptime / 86400);
    const hours = Math.floor((stats.uptime % 86400) / 3600);
    const minutes = Math.floor((stats.uptime % 3600) / 60);
    const uptimeStr = `${days}d ${hours}h ${minutes}m`;

    const topCommands = stats.topCommands.length > 0
      ? stats.topCommands.map((c, i) =>
          `**${i + 1}.** /${c.name} — ${c.uses} uses (avg ${c.avgDuration}ms)`
        ).join('\n')
      : 'No commands recorded yet.';

    const embed = new EmbedBuilder()
      .setColor(0x00FFAB)
      .setTitle('Bot Statistics')
      .addFields(
        { name: 'Commands Executed', value: `\`${stats.totalCommands}\``, inline: true },
        { name: 'Unique Users', value: `\`${stats.uniqueUsers}\``, inline: true },
        { name: 'Error Rate', value: `\`${stats.errorRate}%\``, inline: true },
        { name: 'Uptime', value: `\`${uptimeStr}\``, inline: true },
        { name: 'Top Commands', value: topCommands, inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
