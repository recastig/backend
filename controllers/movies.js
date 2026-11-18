const Movie = require('../models/movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao buscar filmes favoritos.',
    });
  }
};

const createMovie = async (req, res) => {
  const {
    tmdbId,
    title,
    overview,
    posterPath,
    releaseDate,
    voteAverage,
  } = req.body;

  try {
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
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Este filme já está nos seus favoritos.',
      });
    }

    return res.status(500).json({
      message: 'Erro interno ao salvar filme favorito.',
    });
  }
};

const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: 'Filme favorito não encontrado.',
      });
    }

    if (movie.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Você não pode excluir este filme.',
      });
    }

    await Movie.deleteOne({ _id: movieId });

    return res.status(200).json({
      message: 'Filme removido dos favoritos.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao excluir filme favorito.',
    });
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
