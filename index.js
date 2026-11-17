const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI não configurada.');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurada.');
    }

    await mongoose.connect(MONGODB_URI);

    console.log('MongoDB conectado com sucesso!');

    app.listen(PORT, () => {
      console.log(`Cineroleta API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
    process.exitCode = 1;
  }
}

startServer();
