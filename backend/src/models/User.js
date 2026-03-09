const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: "String",
        required: true
    },
    phone: {
        type: "String",
    },
    country: {
        type: "String",
    },
    profileImage: {
        url: String,
        public_id: String,
    },
    encryptionSalt: {
        type: String,
        required: true
    },
    vaultVerifier: {
        iv: String,
        data: String,
        authTag: String
    }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;