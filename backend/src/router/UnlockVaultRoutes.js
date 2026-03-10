const express = require('express');
const protectRoute = require('../middlewares/protectedRoutes.middleware');
const UserModel = require("../models/User");
const deriveKey = require('../utils/deriveKey');
const { decryptPassword } = require('../utils/decryption');
const router = express.Router();

const vaultSessions = require('../utils/vaultSession')

router.post('/vault', protectRoute, async (req, res) => {
    const { masterPass } = req.body;

    const user = await UserModel.findById(req.user._id);

    const key = deriveKey(masterPass, user.encryptionSalt);

    try {
        const decrypted = decryptPassword(
            user.vaultVerifier.data,
            user.vaultVerifier.iv,
            user.vaultVerifier.authTag,
            key
        );

        if (decrypted !== "vault-check") {
            return res.status(401).json({
                success: false,
                message: "Invalid master password"
            });
        }

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid master password"
        });
    }

    vaultSessions.set(req.user._id.toString(), {
        key,
        lastActivity: Date.now()
    });

    res.json({ success: true, message: "Vault unlocked" });
});


router.get('/status', protectRoute, async (req, res) => {

    const userId = req.user._id.toString();
    const session = vaultSessions.get(userId);

    if (!session) {
        return res.json({ unlocked: false });
    }

    const INACTIVITY_LIMIT = 10 * 60 * 1000;

    if (Date.now() - session.lastActivity > INACTIVITY_LIMIT) {
        vaultSessions.delete(userId);
        return res.json({ unlocked: false });
    }

    return res.json({ unlocked: true });
});


module.exports = router