const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API Cineroleta funcionando!',
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada.',
    path: req.originalUrl,
  });
});

module.exports = app;
