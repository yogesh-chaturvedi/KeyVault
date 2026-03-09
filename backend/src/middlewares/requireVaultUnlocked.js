const vaultSessions = require("../utils/vaultSession")

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

const requireVaultUnlocked = (req, res, next) => {
    const userId = req.user._id.toString();

    const session = vaultSessions.get(userId);

    // No session
    if (!session) {
        return res.status(401).json({
            success: false,
            message: "Vault is locked. Please unlock first."
        });
    }

    // Check inactivity timeout
    if (Date.now() - session.lastActivity > INACTIVITY_LIMIT) {
        vaultSessions.delete(userId);

        return res.status(401).json({
            success: false,
            message: "Vault session expired due to inactivity."
        });
    }

    // Refresh activity time
    session.lastActivity = Date.now();
    vaultSessions.set(userId, session);

    // Attach vault key for controllers
    req.vaultKey = session.key;

    next();
};

module.exports = requireVaultUnlocked;