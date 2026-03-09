const mongoose = require('mongoose');


const PasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    site: {
        type: "String",
        required: true
    },
    siteUrl: {
        type: "String",
        required: true,
    },
    userName: {
        type: "String",
        required: true,
    },
    encryptedPassword: {
        type: "String",
        required: true
    },
    iv: {
        type: "String",
        required: true
    },
    authTag: {
        type: "String",
        required: true
    },
    strength: {
        type: String,
        enum: ["weak", "medium", "strong"],
        required: true
    },
    category: {
        type: String,
        required: true
    }

}, { timestamps: true });


const Password = mongoose.model('Password', PasswordSchema);

module.exports = Password;