const express = require('express');
const router = express.Router();
const {getProducts,createProduct,updateProduct,deleteProduct} = require('../controllers/productController');

//create product route -- admin
router.post("/product",createProduct);
//get products route
router.get("/products",getProducts);
//update product route -- admin
router.put("/product/:id",updateProduct);
//delete product route -- admin
router.delete("/product/:id",deleteProduct);

module.exports = router;