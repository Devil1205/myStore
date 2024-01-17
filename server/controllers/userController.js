const User = require('../models/userSchema');

//register a user
const registerUser = async(req,res,next)=>{

    const {name,email,password} = req.body;
    try{
        const user = new User({
            name,
            email,
            password,
            avatar: {
                public_id: "sample id",
                url: "sample url"
            }
        });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

module.exports = {registerUser}