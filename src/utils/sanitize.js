/**
 * Basic input sanitization to prevent injection or malicious inputs.
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  // Strip null bytes and basic dangerous chars, limit length
  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, '')
    .trim()
    .slice(0, 2000); // Discord limit
};

module.exports = { sanitizeInput };
