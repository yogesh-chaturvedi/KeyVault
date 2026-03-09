const express = require('express');
const protectRoute = require('../middlewares/protectedRoutes.middleware');
const { addPassword, fetchPassword, revealPassword, fetchSinglePassword, editPassword, removePassword, searchPassword, getPasswordStats } = require('../conotrollers/passwords.controllers');
const requireVaultUnlocked = require('../middlewares/requireVaultUnlocked');
const router = express.Router();


router.post('/add', protectRoute, requireVaultUnlocked, addPassword)

router.get('/passStats', protectRoute, getPasswordStats)

router.get('/fetch', protectRoute, requireVaultUnlocked, fetchPassword)

router.get('/reveal/:id', protectRoute, revealPassword)

router.get('/fetchSingle/:id', protectRoute, requireVaultUnlocked, fetchSinglePassword)

router.post('/editPassword/:id', protectRoute, requireVaultUnlocked, editPassword)

router.post('/removePassword/:id', protectRoute, removePassword)

router.get('/seach', protectRoute, searchPassword)


module.exports = router