const bcrypt = require('bcryptjs');
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

module.exports = { createUser };
