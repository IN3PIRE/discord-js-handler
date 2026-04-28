const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
 data: new SlashCommandBuilder()
   .setName('avatar')
   .setDescription('Display user avatar')
   .addUserOption(option =>
     option.setName('user')
       .setDescription('The user to get avatar from')
       .setRequired(false)),
 async execute(interaction) {
   try {
     await interaction.deferReply();
     
     const user = interaction.options.getUser('user') ?? interaction.user;
     const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true });
     
     const embed = new EmbedBuilder()
       .setTitle(`${user.tag}'s Avatar`)
       .setImage(avatarURL)
       .setColor(user.accentColor ?? 'Blurple');
     
     const row = new ActionRowBuilder().addComponents(
       new ButtonBuilder()
         .setLabel('Open Full Size')
         .setStyle(ButtonStyle.Link)
         .setURL(avatarURL.split('?')[0])
     );
     
     await interaction.editReply({ 
       embeds: [embed], 
       components: [row] 
     });
   } catch (error) {
     console.error('Avatar command error:', error);
     await interaction.editReply({ 
       content: '❌ Failed to fetch avatar. Please try again.', 
       ephemeral: true 
     });
   }
 },
};
