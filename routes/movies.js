const express = require('express');
const { body, param } = require('express-validator');

const auth = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const router = express.Router();

router.use(auth);

router.get('/movies', getMovies);

router.post(
  '/movies',
  [
    body('tmdbId')
      .isInt({ min: 1 })
      .withMessage('Informe um ID válido da TMDB.')
      .toInt(),

    body('title')
      .isString()
      .withMessage('O título deve ser um texto.')
      .bail()
      .trim()
      .notEmpty()
      .withMessage('Informe o título do filme.'),

    body('overview')
      .optional()
      .isString()
      .withMessage('A sinopse deve ser um texto.'),

    body('posterPath')
      .optional()
      .isString()
      .withMessage('O caminho do pôster deve ser um texto.'),

    body('releaseDate')
      .optional()
      .isISO8601({ strict: true })
      .withMessage('Informe uma data válida.'),

    body('voteAverage')
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage('A nota deve estar entre 0 e 10.')
      .toFloat(),
  ],
  validateRequest,
  createMovie,
);

router.delete(
  '/movies/:movieId',
  [
    param('movieId')
      .isMongoId()
      .withMessage('ID de filme inválido.'),
  ],
  validateRequest,
  deleteMovie,
);

module.exports = router;
