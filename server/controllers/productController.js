const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../models/productSchema');
const apiFeatures = require('../utils/apiFeatures'); 

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
    try{
        const product = await apiFeatures.search(Product,req.query);
        return res.status(200).json(product);
    }
    catch(e){
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
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