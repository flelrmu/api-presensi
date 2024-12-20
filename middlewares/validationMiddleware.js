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
