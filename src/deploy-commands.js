require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'slashcommands');

if (!fs.existsSync(commandsPath)) {
  console.error(`Error: The directory ${commandsPath} does not exist.`);
  process.exit(1);
}

const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const guildId = process.env.GUILD_ID;
    const clientId = process.env.CLIENT_ID;

    if (guildId) {
      console.log(`Started refreshing application (/) commands for guild: ${guildId}`);
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log('Successfully reloaded application (/) commands for guild.');
    } else {
      console.log('Started refreshing global application (/) commands.');
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log('Successfully reloaded global application (/) commands.');
    }
  } catch (error) {
    console.error(error);
  }
})();