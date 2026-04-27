const { SlashCommandBuilder, EmbedBuilder, time } = require('discord.js');

/**
 * Slash command to display detailed information about a Discord user.
 * 
 * Features:
 * - Username & Discriminator (Tag)
 * - User ID
 * - Account Creation Date (Formatted with Discord timestamps)
 * - Server Join Date (Formatted with Discord timestamps)
 * - Roles Count
 * - User Avatar
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays detailed information about a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to get information about')
        .setRequired(false)),

  async execute(interaction) {
    // Default to the user who ran the command if no target is provided
    const user = interaction.options.getUser('target') || interaction.user;
    
    // Fetch member details if the command is run in a guild
    const member = interaction.guild ? await interaction.guild.members.fetch(user.id).catch(() => null) : null;

    const embed = new EmbedBuilder()
      .setColor(0x5865F2) // Discord Blurple for a premium look
      .setAuthor({ 
        name: user.tag, 
        iconURL: user.displayAvatarURL({ dynamic: true }) 
      })
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .addFields(
        { name: '👤 Username', value: `\`${user.username}\``, inline: true },
        { name: '🆔 User ID', value: `\`${user.id}\``, inline: true },
        { name: '🗓️ Account Created', value: `${time(user.createdAt, 'F')}\n(${time(user.createdAt, 'R')})`, inline: false },
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    if (member) {
      embed.addFields(
        { name: '📥 Joined Server', value: `${time(member.joinedAt, 'F')}\n(${time(member.joinedAt, 'R')})`, inline: false },
        { name: '🏷️ Roles Count', value: `\`${member.roles.cache.size - 1}\``, inline: true }
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
