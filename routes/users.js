const express = require('express');
const { body } = require('express-validator');

const { createUser, loginUser, getCurrentUser } = require('../controllers/users');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();
const auth = require('../middlewares/auth');

router.post(
  '/signup',
  [
    body('name')
      .isString()
      .withMessage('O nome deve ser um texto.')
      .bail()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('O nome deve ter entre 2 e 100 caracteres.'),

    body('email')
      .isEmail()
      .withMessage('Informe um e-mail válido.')
      .bail()
      .normalizeEmail(),

    body('password')
      .isString()
      .withMessage('A senha deve ser um texto.')
      .bail()
      .isLength({ min: 8 })
      .withMessage('A senha deve ter pelo menos 8 caracteres.')
      .isByteLength({ max: 72 })
      .withMessage('A senha deve ter no máximo 72 bytes.'),
  ],
  validateRequest,
  createUser,
);

router.post(
  '/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Informe um e-mail válido.')
      .bail()
      .normalizeEmail(),

    body('password')
      .isString()
      .withMessage('A senha deve ser um texto.')
      .bail()
      .notEmpty()
      .withMessage('Informe sua senha.'),
  ],
  validateRequest,
  loginUser,
);

router.get('/users/me', auth, getCurrentUser);

module.exports = router;
