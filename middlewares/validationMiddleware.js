const { check, validationResult } = require('express-validator');

const validateLoginInput = [
  // Validasi untuk login email
  check('login')
    .notEmpty().withMessage('Login (email atau nim) harus diisi')
    .isEmail().withMessage('Email tidak valid')
    .optional({ checkFalsy: true }), // email opsional jika nim diberikan

  // Validasi untuk login NIM
  check('login')
    .notEmpty().withMessage('Login (email atau nim) harus diisi')
    .isLength({ min: 10 }).withMessage('NIM harus terdiri dari minimal 10 karakter')
    .isNumeric().withMessage('NIM hanya boleh terdiri dari angka')
    .optional({ checkFalsy: true }), // NIM opsional jika email diberikan

  // Validasi untuk password
  check('password')
    .notEmpty().withMessage('Password harus diisi')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
];

// Fungsi untuk menangani hasil validasi
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateLoginInput, handleValidation };
