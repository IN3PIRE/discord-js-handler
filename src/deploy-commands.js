require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'slashcommands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const route = process.env.GUILD_ID
      ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
      : Routes.applicationCommands(process.env.CLIENT_ID);
    const scope = process.env.GUILD_ID ? `guild ${process.env.GUILD_ID}` : 'global';

    console.log(`Started refreshing ${scope} application (/) commands.`);
    await rest.put(route, { body: commands });
    console.log(`Successfully reloaded ${scope} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
