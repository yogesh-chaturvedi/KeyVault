const crypto = require("crypto");

const deriveKey = (masterPassword, salt) => {
  return crypto.pbkdf2Sync(
    masterPassword,
    salt,
    100000,        // iterations (important)
    32,            // 32 bytes = 256 bit
    "sha256"
  );
};

module.exports = deriveKey;