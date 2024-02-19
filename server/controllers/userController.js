const User = require('../models/userSchema');
const storeJWTToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

//register user
const registerUser = async (req, res, next) => {

    try {
        const { name, email, password, avatar } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });
        let user = await User.findOne({ email });
        if (user)
            return next({ status: 409, message: "Email is already registered" });
        user = await User({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
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
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//logout user
const logoutUser = async (req, res, next) => {

    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//forgot password
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        //if no user found
        if (!user)
            return next({ status: 404, message: "User not found" });
        const token = user.getResetToken();
        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${token}`;
        const message = `Your password reset link is : \n\n ${resetPasswordUrl} \n\n<b>Important: This link is only valid for 15 minutes, do not share it with anyone otherwise your account security may be compromised.</b>`;

        try {
            //send reset link to user
            await sendEmail({
                message,
                email,
                subject: "myStore - Password Reset Link"
            });
            return res.status(200).json({ success: true, message: `Email sent to ${email} successfully` });
        }
        catch (e) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            // console.log(e);
            return next({ status: 500, message: "Internal Server Error" });
        }

    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//reset password
const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

        //if token is not found or expired
        if (!user)
            return next({ status: 400, message: "The reset password link is invalid or has been expired" });

        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword)
            return next({ status: 400, message: "Passwords do not match" });

        //reset user password 
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        await storeJWTToken(user, 200, "User logged-in successfully", res);
    }
    catch (e) {
        // console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get user details
const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//update user password
const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        //if password incorrect
        if (await user.comparePassword(oldPassword) === false)
            return next({ status: 401, message: "Incorrect password" });

        if (newPassword !== confirmPassword)
            return next({ status: 400, message: "Passwords do not match" });

        //save new password
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ success: true, message: "Password updated successfully" });
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//update user profile
const updateProfile = async (req, res, next) => {
    try {
        const { name, avatar } = req.body;
        const user = await User.findById(req.user.id);
        user.name = name;
        console.log(avatar);
        if (avatar !== '') {
            const public_id = user.avatar.public_id;
            await cloudinary.v2.destroy(public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }

        }
        await user.save();
        return res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get all users -- admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ success: true, users });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get a particular user -- admin
const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return next({ status: 404, message: `User does not exist with id: ${id}` });
        return res.status(200).json({ success: true, user });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//update user role -- admin
const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user)
            return next({ status: 404, message: `User does not exist with id: ${id}` });
        const { name, email, role } = req.body;

        //if email is changed and it already exists
        if (email !== user.email) {
            const emailCheck = await User.findOne({ email });
            if (emailCheck)
                return next({ status: 400, message: "Email already in use" });
        }

        user.name = name;
        user.email = email;
        user.role = role;
        await user.save();
        return res.status(200).json({ success: true, user });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//delete user -- admin
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user)
            return next({ status: 404, message: `User does not exist with id: ${id}` });
        return res.status(200).json({ successs: true, user });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser }