const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../models/productSchema');

//create product route controller
const createProduct = asyncHandler(async(req,res,next)=>{
    const product = new Product(req.body);
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product created successfully"
    })
})

//get products route controller
const getProducts = async(req,res)=>{
    const product = await Product.find();
    return res.status(200).json(product);
}

//update product route controller
const updateProduct = asyncHandler(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    //if no product found, return error
    if(!product)
    {
        return next({status:400,message:"Product not found"});
    }
    await product.updateOne(req.body);
    return res.status(200).json({
        success: true,
        message: "Product updated successfully"
    })
})

//delete product route controller
const deleteProduct = asyncHandler(async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id);
    //if no product found, return error
    if(!product)
    {
        return next({status:400,message:"Product not found"});
    }
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

module.exports = {getProducts,createProduct,updateProduct,deleteProduct};