const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Displays how long the bot has been running.'),
  
  async execute(interaction) {
    try {
      const totalSeconds = process.uptime();
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      const uptimeString = [];
      if (days > 0) uptimeString.push(`**${days}** day${days === 1 ? '' : 's'}`);
      if (hours > 0) uptimeString.push(`**${hours}** hour${hours === 1 ? '' : 's'}`);
      if (minutes > 0) uptimeString.push(`**${minutes}** minute${minutes === 1 ? '' : 's'}`);
      if (seconds > 0 || uptimeString.length === 0) uptimeString.push(`**${seconds}** second${seconds === 1 ? '' : 's'}`);

      const embed = new EmbedBuilder()
        .setColor(0x00FFAB)
        .setTitle('⏱️ Bot Uptime')
        .setDescription(`The bot has been online for:\n${uptimeString.join(', ')}`)
        .addFields(
          { name: '🚀 Process ID', value: `\`${process.pid}\``, inline: true },
          { name: '💻 Memory Usage', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Uptime command error:', error);
      await interaction.reply({
        content: 'Failed to fetch uptime. Please try again.',
        ephemeral: true,
      });
    }
  },
};