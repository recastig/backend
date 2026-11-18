const express = require('express');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

const router = express.Router();

router.use(userRoutes);
router.use(movieRoutes);

module.exports = router;
