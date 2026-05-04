let COOLDOWN_SECONDS = parseInt(process.env.COMMAND_COOLDOWN || 3, 10);
if (isNaN(COOLDOWN_SECONDS) || COOLDOWN_SECONDS <= 0) {
  console.warn('[Warning]: Invalid COMMAND_COOLDOWN value, defaulting to 3 seconds');
  COOLDOWN_SECONDS = 3;
}

const cooldowns = new Map();

// Cleanup expired entries every minute to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of cooldowns.entries()) {
    if (now - timestamp > COOLDOWN_SECONDS * 1000) {
      cooldowns.delete(key);
    }
  }
}, 60000);

function checkCooldown(userId, commandName) {
  const key = `${userId}-${commandName}`;
  const now = Date.now();

  if (cooldowns.has(key)) {
    const lastUsed = cooldowns.get(key);
    const elapsed = (now - lastUsed) / 1000;
    if (elapsed < COOLDOWN_SECONDS) {
      return Math.ceil(COOLDOWN_SECONDS - elapsed);
    }
  }

  return null;
}

function setCooldown(userId, commandName) {
  cooldowns.set(`${userId}-${commandName}`, Date.now());
}

module.exports = { checkCooldown, setCooldown };
