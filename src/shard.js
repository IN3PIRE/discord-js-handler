require('dotenv').config();
const { ShardingManager } = require('discord.js');
const path = require('path');

const manager = new ShardingManager(path.join(__dirname, 'bot.js'), {
  token: process.env.DISCORD_TOKEN,
  totalShards: 'auto'
});

manager.on('shardCreate', shard => {
  console.log(`[Info]: Launched shard ${shard.id}`);
});

manager.spawn()
  .then(() => console.log('[Info]: All shards have been spawned successfully.'))
  .catch(error => console.error('[Error]: Failed to spawn shards:', error));
