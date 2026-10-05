const express = require('express');
const router = express.Router();
const { getBreeds } = require('../controllers/productController');

router.get('/', getBreeds);

module.exports = router;
