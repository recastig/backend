const Movie = require('../models/movie');

const {
  NotFoundError,
  ForbiddenError,
  ConflictError,
} = require('../utils/errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  const {
    tmdbId,
    title,
    overview,
    posterPath,
    releaseDate,
    voteAverage,
  } = req.body;

  try {
    const existingMovie = await Movie.findOne({
      owner: req.user._id,
      tmdbId,
    });

    if (existingMovie) {
      throw new ConflictError('Este filme já está nos seus favoritos.');
    }

    const movie = await Movie.create({
      owner: req.user._id,
      tmdbId,
      title,
      overview,
      posterPath,
      releaseDate,
      voteAverage,
    });

    return res.status(201).json(movie);
  } catch (error) {
    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Filme favorito não encontrado.');
    }

    if (movie.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError('Você não pode excluir este filme.');
    }

    await Movie.deleteOne({
      _id: movieId,
      owner: req.user._id,
    });

    return res.status(200).json({
      message: 'Filme removido dos favoritos.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
