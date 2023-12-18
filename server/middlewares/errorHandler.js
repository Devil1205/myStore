const errorHandler = async({status,message},req,res,next)=>{
    return res.status(status||500).json({
        success: false,
        message: message||"Internal Server Error"
    })
}

module.exports = errorHandler;