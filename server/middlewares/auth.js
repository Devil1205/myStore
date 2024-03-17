const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');

const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ success: "false", message: "Please login to access this feature" });
    try {
        const id = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(id.id);
        if (!id.id)
            return res.status(401).json({ success: "false", message: "hello" });
        next();
    }
    catch (e) {
        // console.log(e);
        const user = await User.findOne({ "loginExpire.device": token });
        if (user) {
            const arr = [];
            user.loginExpire.forEach((elem) => {
                if (elem.device !== token)
                    arr.push(elem);
            });
            user.loginExpire = arr;
            await user.save();
        }
        return res.status(401).json({ success: "false", message: "Please login to access this feature" });
    }
}

const isAuthenticatedRole = (...roles) => {
    return async (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ success: "false", message: "Please login to access this feature" });
        const role = req.user.role;
        if (!roles.includes(role))
            return res.status(403).json({ success: "false", message: "Admin permission required" });
        next();
    }
}

module.exports = { isAuthenticatedUser, isAuthenticatedRole };