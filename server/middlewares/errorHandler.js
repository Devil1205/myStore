const errorHandler = async({status,message},req,res,next)=>{
    res.status(status||500).json({
        success: false,
        message: message||"Internal Server Error"
    })
    next();
}

module.exports = errorHandler;