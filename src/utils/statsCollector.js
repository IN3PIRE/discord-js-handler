const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');

let stats = {
  totalCommands: 0,
  totalErrors: 0,
  uniqueUsers: new Set(),
  commands: {},
  startTime: Date.now(),
};

let loaded = false;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadStats() {
  if (loaded) return;
  loaded = true;
  ensureDataDir();
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      stats.totalCommands = parsed.totalCommands || 0;
      stats.totalErrors = parsed.totalErrors || 0;
      stats.uniqueUsers = new Set(parsed.uniqueUsers || []);
      stats.commands = parsed.commands || {};
      stats.startTime = parsed.startTime || Date.now();
    }
  } catch (error) {
    logger.warn('[Stats] Could not load stats file, starting fresh:', error.message);
  }
}

function saveStats() {
  try {
    ensureDataDir();
    const data = {
      totalCommands: stats.totalCommands,
      totalErrors: stats.totalErrors,
      uniqueUsers: Array.from(stats.uniqueUsers),
      commands: stats.commands,
      startTime: stats.startTime,
    };
    fs.writeFileSync(STATS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    logger.warn('[Stats] Could not save stats:', error.message);
  }
}

function recordCommand(commandName, userId, duration, success) {
  loadStats();
  stats.totalCommands++;
  if (userId) stats.uniqueUsers.add(userId);
  if (!stats.commands[commandName]) {
    stats.commands[commandName] = { uses: 0, errors: 0, totalDuration: 0 };
  }
  stats.commands[commandName].uses++;
  stats.commands[commandName].totalDuration += duration;
  if (!success) {
    stats.totalErrors++;
    stats.commands[commandName].errors++;
  }
}

function recordError(commandName) {
  loadStats();
  stats.totalErrors++;
  if (stats.commands[commandName]) {
    stats.commands[commandName].errors++;
  }
}

function getStats() {
  loadStats();
  const topCommands = Object.entries(stats.commands)
    .sort((a, b) => b[1].uses - a[1].uses)
    .slice(0, 5)
    .map(([name, data]) => ({
      name,
      uses: data.uses,
      avgDuration: data.uses > 0 ? (data.totalDuration / data.uses).toFixed(1) : 0,
    }));

  return {
    totalCommands: stats.totalCommands,
    totalErrors: stats.totalErrors,
    uniqueUsers: stats.uniqueUsers.size,
    uptime: Math.floor((Date.now() - stats.startTime) / 1000),
    topCommands,
    errorRate: stats.totalCommands > 0
      ? ((stats.totalErrors / stats.totalCommands) * 100).toFixed(1)
      : '0.0',
  };
}

function flush() {
  saveStats();
}

setInterval(flush, 30000);

module.exports = { recordCommand, recordError, getStats, flush };
