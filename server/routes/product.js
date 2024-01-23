const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, createReview, getAllReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/auth');
const { createProductValidation, createReviewValidation } = require('../middlewares/productValidation');

//create product route -- admin
router.post("/admin/product", isAuthenticatedUser, isAuthenticatedRole("admin"), createProductValidation.errors, createProductValidation.validate, createProduct);

//get products route
router.get("/products", isAuthenticatedUser, getProducts);

//update product route -- admin
router.put("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), updateProduct);

//delete product route -- admin
router.delete("/admin/product/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteProduct);

//add review
router.post("/product/:id/review", isAuthenticatedUser, createReviewValidation.errors, createReviewValidation.validate, createReview);

//get all reviews of a product
router.get("/product/:id/reviews", getAllReviews);

//delete review
router.delete("/product/:productId/review/:reviewId", isAuthenticatedUser, deleteReview);

module.exports = router;