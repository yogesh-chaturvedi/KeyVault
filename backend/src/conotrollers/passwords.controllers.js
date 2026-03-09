const PasswordModel = require('../models/Password');
const UserModel = require('../models/User');
const { decryptPassword } = require('../utils/decryption');
const deriveKey = require('../utils/deriveKey');
const { encryptPassword } = require('../utils/encryption');
const zxcvbn = require('zxcvbn')
const vaultSessions = require('../utils/vaultSession')
const helpers = require('../utils/helpers')


const { capitalizeWord } = helpers;


const addPassword = async (req, res, next) => {
    try {
        const { site, siteUrl, userName, password, category } = req.body;

        const key = req.vaultKey;

        const result = zxcvbn(password);

        const score = result.score;

        let strengthLevel;

        if (score <= 1) strengthLevel = "weak";
        else if (score === 2) strengthLevel = "medium";
        else strengthLevel = "strong";

        const encrypted = encryptPassword(password, key);

        await PasswordModel.create({
            userId: req.user._id,
            site: capitalizeWord(site),
            siteUrl,
            userName: userName,
            category: category,
            encryptedPassword: encrypted.encryptedData,
            iv: encrypted.iv,
            authTag: encrypted.authTag,
            strength: strengthLevel
        });

        res.status(201).json({ message: "Password saved securely", success: true });

    }
    catch (error) {
        console.error('addPassword controller failed', error)
        next(error)
    }
}


const getPasswordStats = async (req, res) => {
    try {

        const stats = await PasswordModel.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: "$strength",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({ success: true, message: "Password strength fetched successfully", stats });

    }
    catch (error) {
        console.error('addPassword controller failed', error)
        next(error)
    }
}


const fetchPassword = async (req, res, next) => {
    try {

        const passwords = await PasswordModel.find({ userId: req.user._id }, "site userName category siteUrl createdAt");

        if (!passwords) {
            res.status(404).json({ message: "Password not found", success: false });
        }

        res.status(200).json({ message: "Password fetched securely", success: true, userPasswords: passwords });

    }
    catch (error) {
        console.error('fetchPassword controller failed', error)
        next(error)
    }
}


const revealPassword = async (req, res, next) => {
    try {
        const { id } = req.params;

        const item = await PasswordModel.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!item) {
            return res.status(404).json({ message: "Password not found", success: false });
        }

        const decrypted = decryptPassword(
            item.encryptedPassword,
            item.iv,
            item.authTag
        );

        res.status(200).json({
            success: true,
            password: decrypted
        });
    }
    catch (error) {
        console.error('revealPassword controller failed', error)
        next(error)
    }
}


const fetchSinglePassword = async (req, res, next) => {
    try {
        const { id } = req.params;

        const password = await PasswordModel.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!password) {
            return res.status(404).json({ message: "Password not found", success: false });
        }

        const key = req.vaultKey;

        const decrypted = decryptPassword(
            password.encryptedPassword,
            password.iv,
            password.authTag,
            key
        );

        res.status(200).json({
            success: true,
            data: {
                _id: password._id,
                site: password.site,
                siteUrl: password.siteUrl,
                userName: password.userName,
                category: password.category,
                password: decrypted,
                createdAt: password.createdAt,
                updatedAt: password.updatedAt
            },
        });
    }
    catch (error) {
        console.error('fetchSinglePassword controller failed', error)
        next(error)
    }
}


const editPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { site, siteUrl, userName, password, category } = req.body;

        const key = req.vaultKey;

        const item = await PasswordModel.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!item) {
            return res.status(404).json({ message: "Password not found", success: false });
        }

        let encryptPass = encryptPassword(password, key)

        item.site = site;
        item.siteUrl = siteUrl
        item.userName = userName
        item.category = category
        item.encryptedPassword = encryptPass.encryptedData
        item.iv = encryptPass.iv
        item.authTag = encryptPass.authTag

        await item.save();

        res.status(200).json({
            message: 'Updated Successfully',
            success: true,
        });
    }
    catch (error) {
        console.error('editPassword controller failed', error)
        next(error)
    }
}


const removePassword = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPassword = await PasswordModel.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!deletedPassword) {
            return res.status(404).json({
                success: false,
                message: "Password not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Password removed successfully"
        });
    }
    catch (error) {
        console.error('editPassword controller failed', error)
        next(error)
    }
}


const searchPassword = async (req, res, next) => {
    try {
        const { search } = req.query;

        let filter = { userId: req.user._id };
        console.log("searched query", search)

        if (search) {
            filter.$or = [
                { site: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "i" } }
            ];
        }

        const passwords = await PasswordModel.find(
            filter,
            "site username siteUrl createdAt updatedAt"
        );

        res.status(200).json({
            success: true,
            vault: passwords
        });
    }
    catch (error) {
        console.error('searchPassword controller failed', error)
        next(error)
    }
}


module.exports = { addPassword, fetchPassword, revealPassword, fetchSinglePassword, editPassword, removePassword, searchPassword, getPasswordStats }