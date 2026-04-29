require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
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
  if (!fs.existsSync(fullPath)) return;
  
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const command = require(filePath);
    if (dir === 'slashcommands' && 'data' in command && 'execute' in command) {
      collection.set(command.data.name, command);
    } else if (dir === 'prefixcommands' && 'name' in command && 'execute' in command) {
      collection.set(command.name, command);
    }
  }
};

loadCommands('slashcommands', client.commands);
loadCommands('prefixcommands', client.prefixCommands);

const loadEvents = () => {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
  
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};

loadEvents();

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('Failed to login:', err);
  process.exit(1);
});