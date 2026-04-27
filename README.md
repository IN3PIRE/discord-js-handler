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

### Slash Commands
- `/ping` - Basic ping command
- `/server` - Display server information
- `/user` - Display user information
- `/userinfo` - Display detailed user information
- `/uptime` - Show bot uptime

### Prefix Commands
- `!help` - Show help information
- `!info` - Show bot information
- `!time` - Display current time

## Adding New Commands

### Slash Commands
Create a new file in `src/slashcommands/` with the following structure:

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

### Prefix Commands
Create a new file in `src/prefixcommands/` with the following structure:

```javascript
module.exports = {
  name: 'commandname',
  description: 'Description here',
  execute(message, args) {
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

## 🤝 Contributing

We welcome contributions! Please see our detailed [Contributing Guide](CONTRIBUTING.md) for:

- 🌟 **Star Requirement**: Must star repo before PR merge
- 📝 Step-by-step contribution process
- ✅ Code standards and best practices
- 🏷️ Issue labels and assignment process

### Quick Start

1. **Find an Issue**: Look for `good first issue` labels
2. **Comment**: Say "I would like to work on this" on the issue
3. **Wait for Assignment**: Don't start until assigned
4. **Star the Repo**: Click ⭐ at the top right (required for PR merge)
5. **Submit PR**: Follow our contribution guidelines

**Why the star requirement?**
- Verifies you're a human contributor
- Shows support for the project
- Makes you part of our team shaping this repo's future

## License

MIT