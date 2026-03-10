const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const deriveKey = require('../utils/deriveKey');
const { encryptPassword } = require('../utils/encryption');
const helpers = require('../utils/helpers');
const vaultSessions = require('../utils/vaultSession');


const { capitalizeName } = helpers


// signup controller
const signupController = async (req, res, next) => {
    try {
        const { name, email, password, masterPassword } = req.body;

        const encryptionSalt = crypto.randomBytes(16).toString("hex");
        // console.log("encryptionSalt", encryptionSalt)

        const key = deriveKey(masterPassword, encryptionSalt);
        // console.log("key", key)

        const verifier = encryptPassword("vault-check", key);
        // console.log('verifier', verifier)

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: capitalizeName(name),
            email,
            password: hashedPassword,
            encryptionSalt,
            vaultVerifier: {
                iv: verifier.iv,
                data: verifier.encryptedData,
                authTag: verifier.authTag
            }
        });

        // Remove password from response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        // Send success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse,
        });

    } catch (error) {
        next(error); // send to global error handler
    }
};

// login controller
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};

// logout controller 
const logoutController = (req, res) => {

    const userId = req.user._id.toString()

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });

    // deleting vault session
    vaultSessions.delete(userId)

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

}

module.exports = { signupController, loginController, logoutController };