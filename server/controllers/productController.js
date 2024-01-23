const Product = require('../models/productSchema');
const apiFeatures = require('../utils/apiFeatures');

//create product route controller
const createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const product = new Product(req.body);
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product created successfully"
        })
    }
    catch (e) {
        // console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get products route controller
const getProducts = async (req, res, next) => {
    try {
        const product = await apiFeatures.search(Product, req.query);
        return res.status(200).json(product);
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//update product route controller
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }
        await product.updateOne(req.body);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        })
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//delete product route controller
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//create review
const createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const { name, id } = req.user;
        const product = await Product.findById(req.params.id);

        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }

        //store the index of review of already reviewed
        const reviewIndex = product.reviews.findIndex(review => review.user.toString() === id);

        const review = {
            user: id,
            name,
            rating: Number(rating),
            comment
        }
        //if not reviewied, then create new review
        if (reviewIndex === -1) {
            product.reviews.push({
                ...review
            });

            //increase number of reviews
            product.numberOfReviews += 1;
        }

        //if already reviewed, then update old review 
        else {
            product.reviews[reviewIndex] = {
                ...review
            }
        }

        //update product average rating
        let avgRating = 0;
        product.reviews.forEach(review => { avgRating += review.rating });
        product.ratings = (avgRating / product.numberOfReviews).toFixed(2);

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Review added successfully"
        })
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get all reviews of a product
const getAllReviews = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }

        return res.status(200).json({ success: true, reviews: product.reviews });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//delete a review
const deleteReview = async (req, res, next) => {
    try {
        const { productId, reviewId } = req.params;
        const product = await Product.findById(productId);

        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }

        const reviewInd = product.reviews.findIndex(rev => rev._id.toString() === reviewId);
        //if no review found, return error
        if (reviewInd === -1)
            return next({ status: 400, message: "Review not found" });

        //if trying to delete other user's review
        if (product.reviews[reviewInd].user.toString() !== req.user.id)
            return next({ status: 403, message: "Only own reviews are permitted to delete" });

        product.reviews.splice(reviewInd, 1);
        product.numberOfReviews-=1;

        //update product average rating
        let avgRating = 0;
        product.reviews.forEach(review => { avgRating += review.rating });
        product.ratings = (avgRating / product.numberOfReviews).toFixed(2);

        await product.save();
        return res.status(200).json({ success: true, message: "Review deleted successfully" });
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, createReview, getAllReviews, deleteReview };