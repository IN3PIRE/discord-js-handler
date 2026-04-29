require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

if (!process.env.GUILD_ID) {
  console.error('Error: GUILD_ID is not defined in the environment.');
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, '..', 'src', 'slashcommands');

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
    console.log(`Started refreshing application (/) commands for guild: ${process.env.GUILD_ID}`);
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
    console.log('Successfully reloaded application (/) commands for guild.');
  } catch (error) {
    console.error(error);
  }
})();
