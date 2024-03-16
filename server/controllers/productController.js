const Product = require('../models/productSchema');
const apiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

//create product route controller
const createProduct = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const images = [];
        for (let i = 0; i < req.body.images.length; i++) {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.images[i], {
                folder: "products",
            });
            images.push({
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            });
        }
        const product = new Product({ ...req.body, images });
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
        const { product, filteredProductCount } = await apiFeatures.search(Product, req.query);
        const totalProductCount = await Product.countDocuments();
        return res.status(200).json({ success: true, product, totalProductCount, filteredProductCount });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get products route controller -- admin
const getProductsAdmin = async (req, res, next) => {
    try {
        const product = await Product.find();
        return res.status(200).json({ success: true, product });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get a single product route controller
const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        //if no product found, return error
        if (!product) {
            return next({ status: 400, message: "Product not found" });
        }

        return res.status(200).json({ success: true, product });
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

        //if image is not changed
        if (req.body.imgUpdated === false)
            delete req.body.images;
        //if image is changed
        else {
            //delete old images from Cloudinary
            const images = [];
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
            //upload new images to Cloudinary
            for (let i = 0; i < req.body.images.length; i++) {
                const myCloud = await cloudinary.v2.uploader.upload(req.body.images[i], {
                    folder: "products",
                });
                images.push({
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                });
            }
            req.body.images = images;
        }

        delete req.body.imgUpdated;

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

        //delete product images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch (e) {
        // console.log(e);
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
        // console.log(e);
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

//get all reviews of all products -- admin
const getAllReviewsAdmin = async (req, res, next) => {
    try {
        const product = await Product.find({ reviews: { $ne: [] } }).select("reviews");
        const temp = [];
        product.forEach((productItem) => {
            productItem.reviews.forEach((review) => {
                temp.push({ product: productItem._id, ...review.toObject() });
            });
        });

        return res.status(200).json({ success: true, reviews: temp });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//delete a review -- admin
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

        // //if trying to delete other user's review
        // if (product.reviews[reviewInd].user.toString() !== req.user.id)
        //     return next({ status: 403, message: "Only own reviews are permitted to delete" });

        product.reviews.splice(reviewInd, 1);
        product.numberOfReviews -= 1;

        //update product average rating
        let avgRating = 0;
        if (product.numberOfReviews !== 0) {
            product.reviews.forEach(review => { avgRating += review.rating });
            product.ratings = (avgRating / product.numberOfReviews).toFixed(2);
        }
        else {
            product.ratings = 0;
        }

        await product.save();
        return res.status(200).json({ success: true, message: "Review deleted successfully" });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

module.exports = { getProducts, getProductsAdmin, getProduct, createProduct, updateProduct, deleteProduct, createReview, getAllReviews, getAllReviewsAdmin, deleteReview };