const { check, validationResult } = require('express-validator');

exports.validateLoginInput = [
  check('email').notEmpty().withMessage('Email harus diisi').isEmail().withMessage('Format email tidak valid'),
  check('password').notEmpty().withMessage('Password harus diisi'),
];

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateEditProfileInput = [
  check('nama').optional().notEmpty().withMessage('Nama tidak boleh kosong'),
  check('email').optional().isEmail().withMessage('Format email tidak valid'),
  check('departemen_id').optional().isInt().withMessage('Departemen ID harus berupa angka'),
];

exports.validateChangePasswordInput = [
  check('currentPassword').notEmpty().withMessage('Password saat ini harus diisi'),
  check('newPassword')
    .notEmpty()
    .withMessage('Password baru harus diisi')
    .isLength({ min: 6 })
    .withMessage('Password baru minimal 6 karakter'),
];

