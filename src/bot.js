require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const setupHealthCheck = require('./health');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.prefixCommands = new Collection();

const loadCommands = (dir, collection) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[Warning]: Directory ${dir} does not exist. Skipping...`);
    return;
  }
  
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    try {
      const command = require(filePath);
      if (dir === 'slashcommands' && 'data' in command && 'execute' in command) {
        collection.set(command.data.name, command);
      } else if (dir === 'prefixcommands' && 'name' in command && 'execute' in command) {
        collection.set(command.name, command);
      }
    } catch (error) {
      console.error(`[Error]: Failed to load command at ${file}:`, error.message);
    }
  }
};

loadCommands('slashcommands', client.commands);
loadCommands('prefixcommands', client.prefixCommands);

const loadEvents = () => {
  const eventsPath = path.join(__dirname, 'events');
  if (!fs.existsSync(eventsPath)) {
    console.warn(`[Warning]: Directory 'events' does not exist. Skipping...`);
    return;
  }

  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
  
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    try {
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, async (...args) => {
          try {
            await event.execute(...args);
          } catch (error) {
            console.error(`[Error]: Event handler '${event.name}' threw an error:`, error);
          }
        });
      } else {
        client.on(event.name, async (...args) => {
          try {
            await event.execute(...args);
          } catch (error) {
            console.error(`[Error]: Event handler '${event.name}' threw an error:`, error);
          }
        });
      }
    } catch (error) {
      console.error(`[Error]: Failed to load event at ${file}:`, error.message);
    }
  }
};

loadEvents();

// Item #11: Start health check endpoint
setupHealthCheck(client, process.env.PORT || 3000);

// Item #4: Handle potential login rejections (Good bonus for the maintainer!)
client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('[Error]: Discord login failed:', error.message);
});