const express = require("express");
const router = express.Router();
const {
  login,
  refreshToken,
  authenticate,
  logout
} = require("../controllers/authController");
const {
  validateLoginInput,
  handleValidation,
} = require("../middlewares/validationMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  editProfile,
  changePassword,
} = require("../controllers/authController");
// const {
//   validateEditProfileInput,
//   validateChangePasswordInput,
// } = require("../middlewares/validationMiddleware");

// Rute Login
router.post("/login", validateLoginInput, handleValidation, login);

// Rute Refresh Token
router.post("/refresh-token", refreshToken);

router.put(
  "/edit-profile",
  authenticate,
  upload.single("foto_profile"),
  // validateEditProfileInput,
  handleValidation,
  editProfile
);

router.put(
  "/change-password",
  authenticate,
  // validateChangePasswordInput, 
  handleValidation,
  changePassword
);

// Rute Logout
router.post("/logout", logout);


module.exports = router;
