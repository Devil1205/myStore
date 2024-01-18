const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/userController");
const { createUserValidation, loginUserValidation } = require('../middlewares/validation');

//create user
router.post("/register", createUserValidation.errors, createUserValidation.validate, registerUser);

//login user
router.post("/login", loginUserValidation.errors, loginUserValidation.validate, loginUser)

module.exports = router;