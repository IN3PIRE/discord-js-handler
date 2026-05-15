const validatePermissions = (interaction, command) => {
  if (!command.permissions) return true;
  
  if (!interaction.member || !interaction.member.permissions) {
    return false;
  }
  
  const missingPermissions = [];
  for (const permission of command.permissions) {
    if (!interaction.member.permissions.has(permission)) {
      missingPermissions.push(permission);
    }
  }
  
  if (missingPermissions.length > 0) {
    interaction.reply({ 
      content: `You do not have permission to use this command. Missing: \`${missingPermissions.join(', ')}\``, 
      ephemeral: true 
    }).catch(console.error);
    return false;
  }
  
  return true;
};

module.exports = { validatePermissions };
