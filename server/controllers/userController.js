const User = require('../models/userSchema');
const storeJWTToken = require('../utils/jwtToken');

//register user
const registerUser = async (req, res, next) => {

    try {
        const { name, email, password, avatar } = req.body;
        let user = await User.findOne({ email });
        if (user)
            return next({ status: 409, message: "Email is already registered" });
        user = await User({
            name,
            email,
            password,
            avatar
        });
        await user.save();
        await storeJWTToken(user, 201, "User created successfully", res);
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//login user
const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        //if credentials are not present
        if (!email || !password)
            return next({ status: 401, message: "Invalid email or password" });
        const user = await User.findOne({ email }).select("+password");
        //if email incorrect
        if (!user)
            return next({ status: 401, message: "Invalid email or password" });
        //if password incorrect
        if (await user.comparePassword(password) === false)
            return next({ status: 401, message: "Invalid email or password" });

        await storeJWTToken(user, 200, "User logged-in successfully", res);
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginUser }