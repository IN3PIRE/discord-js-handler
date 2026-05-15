const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const currentLevel = levels[process.env.LOG_LEVEL || 'info'] ?? 1;

const logger = {
  debug: (...args) => { if (currentLevel <= 0) console.log('[DEBUG]', ...args); },
  info: (...args) => { if (currentLevel <= 1) console.log('[INFO]', ...args); },
  warn: (...args) => { if (currentLevel <= 2) console.warn('[WARN]', ...args); },
  error: (...args) => { if (currentLevel <= 3) console.error('[ERROR]', ...args); }
};

module.exports = logger;
