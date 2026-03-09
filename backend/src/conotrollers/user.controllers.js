const cloudinary = require("../configs/cloudinary");
const User = require("../models/User");
const { encryptPassword } = require("../utils/encryption");
const helpers = require("../utils/helpers");


const { capitalizeName } = helpers;

const uploadProfileImage = async (req, res) => {
    try {
        const { name, email, password, phone, country } = req.body

        const updateData = {};

        // Only update fields that are provided
        if (name) updateData.name = capitalizeName(name);
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (country) updateData.country = country;

        if (password) {
            const hashedPassword = encryptPassword(password);
            updateData.password = hashedPassword;
        }


        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: "profile_images",
                        public_id: `user_${req.user.id}`,
                        overwrite: true,
                        transformation: [
                            { width: 300, height: 300, crop: "fill", gravity: "face" },
                        ],
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });

            // if file is present then only update users profile image
            updateData.profileImage = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            userData: updatedUser,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
};



module.exports = { uploadProfileImage }