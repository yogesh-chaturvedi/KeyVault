const express = require('express');
const validate = require('../middlewares/authValidation.middleware');
const { signupSchema, loginSchema } = require('../validations/auth.validation');
const { signupController, loginController, logoutController } = require('../conotrollers/auth.controllers');
const protectRoute = require('../middlewares/protectedRoutes.middleware');

const router = express.Router();

// signup route
router.post('/signup', validate(signupSchema), signupController)

// login route
router.post('/login', validate(loginSchema), loginController)


router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ message: "Verification completed", success: true, user: req.user })
})


router.post('/logout', protectRoute, logoutController)


module.exports = router