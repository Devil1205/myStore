//get products route controller
const getProducts = (req,res)=>{
    return res.status(200).send("all products fetched");
}

module.exports = {getProducts};