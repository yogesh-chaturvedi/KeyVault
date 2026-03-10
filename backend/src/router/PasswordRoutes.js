const express = require('express');
const protectRoute = require('../middlewares/protectedRoutes.middleware');
const { addPassword, fetchPassword, fetchSinglePassword, editPassword, removePassword, searchPassword, getPasswordStats } = require('../conotrollers/passwords.controllers');
const requireVaultUnlocked = require('../middlewares/requireVaultUnlocked');
const router = express.Router();


router.post('/add', protectRoute, requireVaultUnlocked, addPassword)

router.get('/passStats', protectRoute, getPasswordStats)

router.get('/fetch', protectRoute, requireVaultUnlocked, fetchPassword)

router.get('/fetchSingle/:id', protectRoute, requireVaultUnlocked, fetchSinglePassword)

router.post('/editPassword/:id', protectRoute, requireVaultUnlocked, editPassword)

router.post('/removePassword/:id', protectRoute, requireVaultUnlocked, removePassword)

router.get('/seach', protectRoute, requireVaultUnlocked, searchPassword)


module.exports = router