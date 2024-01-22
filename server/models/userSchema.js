const mongoose = require('mongoose');
const validator = require('validator');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name must be atleast 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be atleast 6 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//to hash the password before saving
User.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//to generate and return jwt token
User.methods.getJWTToken = function(){
    const token = jwt.sign({id: this._id},JWT_SECRET,{expiresIn: JWT_EXPIRY});
    return token;
}

//to verify the password
User.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password); 
}

//to generate password reset token
User.methods.getResetToken = function(){
    const token = crypto.randomBytes(20).toString("hex");
    const cryptToken = crypto.createHash("sha256").update(token).digest("hex");
    this.resetPasswordToken = cryptToken;
    this.resetPasswordExpire = new Date(Date.now() + 15*60*1000);
    return token;
}

module.exports = mongoose.model("User", User);