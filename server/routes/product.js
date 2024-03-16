const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, createReview, getAllReviews, deleteReview, getProductsAdmin, getAllReviewsAdmin } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/auth');
const { createProductValidation, createReviewValidation } = require('../middlewares/productValidation');

//create product route -- admin
router.post("/admin/product", isAuthenticatedUser, isAuthenticatedRole("admin"), createProductValidation.errors, createProductValidation.validate, createProduct);

//get products route -- admin
router.get("/admin/products", isAuthenticatedUser, isAuthenticatedRole("admin"), getProductsAdmin);

//get products route
router.get("/products", getProducts);

//get a single product route
router.get("/product/:id", getProduct);

//update product route -- admin
router.put("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), updateProduct);

//delete product route -- admin
router.delete("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteProduct);

//add review
router.post("/product/:id/review", isAuthenticatedUser, createReviewValidation.errors, createReviewValidation.validate, createReview);

//get all reviews of a product
router.get("/product/:id/reviews", getAllReviews);

//get all reviews of all products -- admin
router.get("/admin/reviews", isAuthenticatedUser, isAuthenticatedRole("admin"), getAllReviewsAdmin);

//delete review -- admin
router.delete("/admin/product/:productId/review/:reviewId", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteReview);

module.exports = router;