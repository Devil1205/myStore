const express = require('express');
const router = express.Router();
const {registerUser} = require("../controllers/userController");

//create user
router.post("/register",registerUser);

module.exports = router;