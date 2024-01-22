const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/auth');

//create product route -- admin
router.post("/admin/product", isAuthenticatedUser, isAuthenticatedRole("admin"), createProduct);

//get products route
router.get("/products", isAuthenticatedUser, getProducts);

//update product route -- admin
router.put("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), updateProduct);

//delete product route -- admin
router.delete("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteProduct);

module.exports = router;