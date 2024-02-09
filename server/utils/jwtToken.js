//store jwt token in the cookie
const storeJWTToken = async (user, statusCode, message, res) => {
    const token = user.getJWTToken();
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    return res.status(statusCode).cookie('token',token,cookieOptions).json({
        success: true,
        message,
        token,
    })
}

module.exports = storeJWTToken;