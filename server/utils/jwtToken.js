
//store jwt token in the cookie
const storeJWTToken = async (user, statusCode, message, res) => {
    try {
        const token = user.getJWTToken();
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        user.loginExpire.push({
            device: token,
            expire: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000)
        });
        await user.save();

        return res.status(statusCode).cookie('token', token, cookieOptions).json({
            success: true,
            message,
            token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

module.exports = storeJWTToken;