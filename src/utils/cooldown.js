const cooldowns = new Map();
const COOLDOWN_SECONDS = process.env.COMMAND_COOLDOWN || 3;

// Cleanup expired entries every minute to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of cooldowns.entries()) {
    if (now - timestamp > COOLDOWN_SECONDS * 1000) {
      cooldowns.delete(key);
    }
  }
}, 60000);

/**
 * Checks if a user is on cooldown.
 * @param {string} userId - The Discord user ID
 * @param {string} commandName - The command name
 * @param {boolean} setOnPass - Whether to set cooldown immediately on pass
 * @returns {string|null} - Remaining seconds if on cooldown, null if not
 */
function checkCooldown(userId, commandName, setOnPass = true) {
  const key = `${userId}-${commandName}`;
  const now = Date.now();

  if (cooldowns.has(key)) {
    const lastUsed = cooldowns.get(key);
    const elapsed = (now - lastUsed) / 1000;
    if (elapsed < COOLDOWN_SECONDS) {
      return (COOLDOWN_SECONDS - elapsed).toFixed(1);
    }
  }

  if (setOnPass) {
    cooldowns.set(key, now);
  }
  return null;
}

function setCooldown(userId, commandName) {
  cooldowns.set(`${userId}-${commandName}`, Date.now());
}

module.exports = { checkCooldown, setCooldown };
