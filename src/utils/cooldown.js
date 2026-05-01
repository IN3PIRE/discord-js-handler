const cooldowns = new Map();
const COOLDOWN_SECONDS = 3;

/**
 * Checks if a user is on cooldown.
 * @param {string} userId - The Discord user ID
 * @param {string} commandName - The command name
 * @returns {number|null} - Remaining seconds if on cooldown, null if not
 */
function checkCooldown(userId, commandName) {
  const key = `${userId}-${commandName}`;
  const now = Date.now();

  if (cooldowns.has(key)) {
    const lastUsed = cooldowns.get(key);
    const elapsed = (now - lastUsed) / 1000;

    if (elapsed < COOLDOWN_SECONDS) {
      return (COOLDOWN_SECONDS - elapsed).toFixed(1);
    }
  }

  cooldowns.set(key, now);
  return null;
}

module.exports = { checkCooldown };