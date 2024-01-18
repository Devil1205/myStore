const Product = require('../models/productSchema');
const apiFeatures = require('../utils/apiFeatures');

//create product route controller
const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product created successfully"
        })
    }
    catch (e) {
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
    try{
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
    try{
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

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };