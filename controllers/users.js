const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'Este e-mail já está cadastrado.',
      });
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
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Este e-mail já está cadastrado.',
      });
    }

    return res.status(500).json({
      message: 'Erro interno ao cadastrar usuário.',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'E-mail ou senha incorretos.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'E-mail ou senha incorretos.',
      });
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao realizar login.',
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado.',
      });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno ao buscar usuário.',
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
};
