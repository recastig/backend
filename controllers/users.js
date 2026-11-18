const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');
const User = require('../models/user');

const {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require('../utils/errors');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ConflictError('Este e-mail já está cadastrado.');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
};
