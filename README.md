<div align="center">
  <br>
  <p>
    <img src="https://discord.js.org/static/logo.svg" alt="Discord.js" width="150" />
  </p>
  <h1>🤖 Discord.js Handler</h1>
  <p>Production-ready Discord.js v14 bot handler with slash commands, event system, and modular architecture</p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/npm-v14.14.1-blue?style=flat-square&logo=npm" alt="NPM Version" />
    <img src="https://img.shields.io/badge/discord.js-v14.14.1-5865F2?style=flat-square&logo=discord" alt="Discord.js Version" />
    <img src="https://img.shields.io/github/license/IN3PIRE/discord-js-handler?style=flat-square&color=green" alt="License" />
    <img src="https://img.shields.io/github/stars/IN3PIRE/discord-js-handler?style=flat-square&color=yellow" alt="Stars" />
  </p>
  <p>
    <a href="#quick-start">⚡ Quick Start</a> •
    <a href="#commands">🎯 Commands</a> •
    <a href="#adding-new-commands">➕ Add Commands</a> •
    <a href="#contributing">🤝 Contribute</a>
  </p>
</div>

<br>

## ✨ Features

- 🔮 **Latest Discord.js v14.14.1** - Built with the most recent Discord API features
- 🧩 **Modular Architecture** - Clean separation of commands and events
- ⚡ **Slash Commands Ready** - Native support for Discord's slash commands
- 🎛️ **Prefix Commands** - Traditional command support for backward compatibility
- 🛡️ **Production-Ready** - Robust error handling and logging
- 📦 **Lightweight** - Minimal dependencies with maximum performance
- 🔥 **Hot Reloading** - Easy command and event development
- 🧰 **Developer-Friendly** - Simple API for creating new features

## 🚀 Tech Stack

- [Discord.js](https://discord.js.org/) - Discord API library
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment management

## ⚡ Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 7.0.0 or higher
- A Discord bot token ([Get one here](https://discord.com/developers/applications))

### Installation

```bash
# Clone the repository
git clone https://github.com/IN3PIRE/discord-js-handler.git
cd discord-js-handler

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your favorite editor and add your tokens
nano .env

# Deploy slash commands (required)
npm run deploy

# Start the bot
npm start
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Your bot token from Discord Developer Portal | ✅ Yes |
| `CLIENT_ID` | Your Discord application ID | ✅ Yes |
| `GUILD_ID` | Test guild ID (optional, for guild-specific commands) | ❌ No |

## 🎯 Commands

### Slash Commands

| Command | Description |
|---------|-------------|
| `/ping` | Check bot latency and API response time |
| `/server` | Display detailed server information |
| `/user` | Show basic user information |
| `/userinfo` | Display comprehensive user statistics |
| `/uptime` | Show how long the bot has been running |

### Prefix Commands

| Command | Description |
|---------|-------------|
| `!help` | Display available commands and usage |
| `!info` | Show bot information and statistics |
| `!time` | Display current server time |

## ➕ Adding New Commands

### Create Slash Commands

Create a new file in **`src/slashcommands/`**:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Description of what this command does'),
  
  async execute(interaction) {
    // Your command logic here
    await interaction.reply('Command executed successfully!');
  },
};
```

### Create Prefix Commands

Create a new file in **`src/prefixcommands/`**:

```javascript
module.exports = {
  name: 'commandname',
  description: 'Description of what this command does',
  
  execute(message, args) {
    // Your command logic here
    message.reply('Command executed successfully!');
  },
};
```

### Create Event Handlers

Create a new file in **`src/events/`**:

```javascript
module.exports = {
  name: 'eventName', // Event name from Discord.js
  once: false, // true = execute once, false = execute on every event
  
  execute(...args) {
    // Your event logic here
    console.log('Event triggered:', this.name);
  },
};
```

## 🛠️ Development

### Available Scripts

```bash
# Deploy slash commands globally
npm run deploy

# Start the bot in production
npm start

# Start with auto-restart on file changes (requires nodemon)
npm run dev

# Install dependencies
npm install
```

### Project Structure

```
discord-js-handler/
├── src/
│   ├── events/           # Event handlers
│   ├── prefixcommands/   # Prefix-based commands
│   ├── slashcommands/    # Slash commands
│   ├── deploy-commands.js # Command deployment script
│   └── index.js          # Main bot file
├── .env.example        # Environment template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
```

## 🤝 Contributing

We love your input! We want to make contributing as easy and transparent as possible. Please read our detailed [Contributing Guide](CONTRIBUTING.md) for the full process.

### 🌟 Star Requirement

**⚠️ IMPORTANT**: You must ⭐ star this repository before your PR can be merged

### 🚀 Quick Contribution Steps

1. **⭐ Star the repo** (top-right corner) - Required for PR merge
2. **Find an issue**: Look for `good first issue` or `help wanted` labels
3. **Comment**: Say "I would like to work on this" on the issue
4. **Wait for assignment**: Don't start until officially assigned
5. **Fork & create branch**: `git checkout -b feature/amazing-feature`
6. **Submit PR**: Follow our contribution guidelines

### 🏷️ Issue Labels

- `good first issue` - Perfect for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Docs need updating

**Why the star requirement?**
- ✨ Shows support for the project
- 👤 Verifies human contributors
- 🫂 Makes you part of our community

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

If you like this project, please give it a ⭐ star!

---

<div align="center">
  <p>Made with ❤️ by the IN3PIRE Team</p>
  <p>
    <a href="https://github.com/IN3PIRE">View our other projects</a> •
    <a href="https://discord.gg">Join our Discord</a>
  </p>
</div>
