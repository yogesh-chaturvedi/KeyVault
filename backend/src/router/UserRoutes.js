const express = require('express')
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const protectRoute = require('../middlewares/protectedRoutes.middleware');
const { uploadProfileImage } = require('../conotrollers/user.controllers');

router.post(
    "/update-profile",
    protectRoute,
    upload.single("profileImage"),
    uploadProfileImage
);


module.exports = router;