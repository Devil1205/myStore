const express = require('express');
const router = express.Router();
const {getProducts} = require('../controllers/productController');

//get products route
router.get("/products",getProducts);

module.exports = router;