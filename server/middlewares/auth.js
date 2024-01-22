const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ success: "false", message: "Please login to access this feature" });
    try {
        const id = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id.id);
        next();
    }
    catch (e) {
        // console.log(e);
        return res.status(401).json({ success: "false", message: "Please login to access this feature" });
    }
}

const isAuthenticatedRole = (...roles) => {
    return async (req, res, next) => {
        const role = req.user.role;
        if(!roles.includes(role))
            return res.status(403).json({ success: "false", message: "Admin permission required" });
        next();
    }
}

module.exports = { isAuthenticatedUser, isAuthenticatedRole };