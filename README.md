# Discord.js Handler

Production-ready Discord.js v14 bot handler with slash commands, event system, and modular architecture.

## Features

- ✨ Built for Discord.js v14.14.1 (latest)
- 🚀 Modular command/event system
- 🔧 Easy deployment with slash commands
- 🛡️ Production-ready error handling
- 📦 Lightweight with minimal dependencies

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Deploy commands: `npm run deploy`
5. Start the bot: `npm start`

## Environment Variables

- `DISCORD_TOKEN` - Your bot token from Discord Developer Portal
- `CLIENT_ID` - Your Discord application ID
- `GUILD_ID` - Your test guild ID (optional, for guild-specific commands)

## Commands

- `/ping` - Basic ping command
- `/server` - Display server information
- `/user` - Display user information

## Adding New Commands

Create a new file in `src/commands/` with the following structure:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Description here'),
  async execute(interaction) {
    // Command logic here
  },
};
```

## Adding New Events

Create a new file in `src/events/` with the following structure:

```javascript
module.exports = {
  name: 'eventName',
  once: true, // or false for recurring events
  execute(...args) {
    // Event logic here
  },
};
```

## License

MIT