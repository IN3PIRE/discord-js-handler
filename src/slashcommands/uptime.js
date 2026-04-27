const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

/**
 * Slash command to display the bot's current uptime.
 * 
 * Features:
 * - Calculates runtime in Days, Hours, Minutes, and Seconds
 * - Premium-styled embed with dynamic coloring
 * - Educational comments for new contributors
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Displays how long the bot has been running.'),

  async execute(interaction) {
    // process.uptime() returns the number of seconds the current Node.js process has been running.
    const totalSeconds = process.uptime();
    
    // Break down seconds into days, hours, minutes, and seconds
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Create a human-readable duration string
    const uptimeString = [];
    if (days > 0) uptimeString.push(`**${days}** day${days === 1 ? '' : 's'}`);
    if (hours > 0) uptimeString.push(`**${hours}** hour${hours === 1 ? '' : 's'}`);
    if (minutes > 0) uptimeString.push(`**${minutes}** minute${minutes === 1 ? '' : 's'}`);
    if (seconds > 0 || uptimeString.length === 0) uptimeString.push(`**${seconds}** second${seconds === 1 ? '' : 's'}`);

    const embed = new EmbedBuilder()
      .setColor(0x00FFAB) // Vibrant green for "online/uptime" vibe
      .setTitle('⏱️ Bot Uptime')
      .setDescription(`The bot has been online for:\n${uptimeString.join(', ')}`)
      .addFields(
        { name: '🚀 Process ID', value: `\`${process.pid}\``, inline: true },
        { name: '💻 Memory Usage', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, inline: true }
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
