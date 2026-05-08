<!-- Header Banner -->
<div align="center">

![Discord.js Handler](https://img.shields.io/badge/Discord.js-Handler-5865F2?style=for-the-badge&logo=discord&logoColor=white)

# 🤖 Discord.js Handler

**Production-Ready Discord Bot Framework with Modular Architecture**

[![npm version](https://img.shields.io/npm/v/discord.js?style=flat-square&logo=npm&color=CB3837)](https://www.npmjs.com/package/discord.js)
[![Discord.js v14](https://img.shields.io/badge/Discord.js-v14.14.1-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0+-green?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/IN3PIRE/discord-js-handler?style=flat-square&color=yellow)](LICENSE)
[![Stars](https://img.shields.io/github/stars/IN3PIRE/discord-js-handler?style=flat-square&color=gold)](https://github.com/IN3PIRE/discord-js-handler/stargazers)

[⚡ Quick Start](#-quick-start) • [🎯 Commands](#-commands) • [📖 Documentation](#-adding-new-commands) • [🤝 Contribute](#-contributing)

---

</div>

## 📖 Table of Contents

<details>
<summary>Click to expand</summary>

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🎯 Commands](#-commands)
- [➕ Adding Commands](#-adding-new-commands)
- [🛠️ Development](#%EF%B8%8F-development)
- [🤝 Contributing](#-contributing)
- [🏆 Contributors](#-top-contributors)

</details>

---

## ✨ Features

<table>
<tr>
<td align="center">🔮 <strong>Latest Discord.js v14.14.1</strong><br><small>Most recent Discord API features</small></td>
<td align="center">🧩 <strong>Modular Architecture</strong><br><small>Clean separation of concerns</small></td>
<td align="center">⚡ <strong>Slash Commands</strong><br><small>Native slash command support</small></td>
<td align="center">🎛️ <strong>Prefix Commands</strong><br><small>Backward compatibility</small></td>
</tr>
<tr>
<td align="center">🛡️ <strong>Production-Ready</strong><br><small>Robust error handling</small></td>
<td align="center">📦 <strong>Lightweight</strong><br><small>Minimal dependencies</small></td>
<td align="center">🔥 <strong>Hot Reloading</strong><br><small>Easy development</small></td>
<td align="center">🧰 <strong>Developer-Friendly</strong><br><small>Simple API</small></td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

- ✅ Node.js 18.0.0+
- ✅ npm 7.0.0+
- ✅ [Discord Bot Token](https://discord.com/developers/applications)

### Installation

```bash
# Clone repository
git clone https://github.com/IN3PIRE/discord-js-handler.git
cd discord-js-handler

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env # Add your tokens

# Deploy slash commands
npm run deploy

# Start bot
npm start
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|:--------:|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal | ✅ |
| `CLIENT_ID` | Discord application ID | ✅ |
| `GUILD_ID` | Test guild ID (optional) | ❌ |

---

## 🎯 Commands

### Slash Commands

| Command | Description |
|:-------:|-------------|
| `/ping` | Check bot latency |
| `/server` | Display server info |
| `/user` | Show user info |
| `/userinfo` | User statistics |
| `/uptime` | Bot uptime |

### Prefix Commands

| Command | Description |
|:-------:|-------------|
| `!help` | Display help |
| `!info` | Bot information |
| `!time` | Server time |

---

## ➕ Adding New Commands

### Slash Command Example

```javascript
// src/slashcommands/ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency'),
  async execute(interaction) {
    await interaction.reply('🏓 Pong!');
  },
};
```

### Prefix Command Example

```javascript
// src/prefixcommands/help.js
module.exports = {
  name: 'help',
  description: 'Display commands',
  execute(message, args) {
    message.reply('Commands: !help, !info, !time');
  },
};
```

### Event Handler Example

```javascript
// src/events/ready.js
module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Ready as ${client.user.tag}`);
  },
};
```

---

## 🛠️ Development

### Scripts

```bash
npm run deploy   # Deploy slash commands
npm start        # Start production
npm run dev      # Development mode
npm install      # Install deps
```

### Project Structure

```
discord-js-handler/
├── src/
│   ├── events/           # Event handlers
│   ├── prefixcommands/   # Prefix commands
│   ├── slashcommands/    # Slash commands
│   ├── deploy-commands.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

---

## 🤝 Contributing

> **⚠️ IMPORTANT:** You must ⭐ **star this repository** before your PR can be merged!

### Quick Steps

1. **⭐ Star** the repository
2. **Find an issue** with `good first issue` label
3. **Comment** "I would like to work on this"
4. **Wait for assignment**
5. **Fork & create branch**: `git checkout -b feature/your-feature`
6. **Submit PR**

### Issue Labels

- `good first issue` - Perfect for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something broken
- `enhancement` - New feature
- `documentation` - Update docs

---

## 🏆 Top Contributors

| Rank | Contributor | Commits |
|:----:|:-----------:|:-------:|
| 🥇 | TrivCodez | 13+ |
| 🥈 | Ramanand-Shirbhate | 2 |
| 🥉 | KunalTiwari-git | 2 |
| 4 | dromero14521 | 1 |
| 5 | ixhxpns | 1 |

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ by the IN3PIRE Team**

[View Projects](https://github.com/IN3PIRE) • [Join Discord](https://discord.gg/)

**If you like this project, please give it a ⭐ star!**

</div>
