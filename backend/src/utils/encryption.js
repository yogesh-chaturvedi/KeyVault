const crypto = require("crypto");

const algorithm = "aes-256-gcm";

const encryptPassword = (text, key) => {

    const iv = crypto.randomBytes(12); // GCM recommended 12 bytes

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
        encryptedData: encrypted,
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
    };
};


module.exports = { encryptPassword }