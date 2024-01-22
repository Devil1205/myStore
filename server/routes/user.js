const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} = require("../controllers/userController");
const { createUserValidation, loginUserValidation, forgotPasswordValidation, resetPasswordValidation, updatePasswordValidation, updateProfileValidation, updateUserRoleValidation } = require('../middlewares/userValidation');
const {isAuthenticatedUser, isAuthenticatedRole} = require('../middlewares/auth');

//create user
router.post("/register", createUserValidation.errors, createUserValidation.validate, registerUser);

//login user
router.post("/login", loginUserValidation.errors, loginUserValidation.validate, loginUser);

//logout user
router.get("/logout", isAuthenticatedUser, logoutUser);

//forgot password
router.post("/password/forgot", forgotPasswordValidation.errors, forgotPasswordValidation.validate, forgotPassword);

//forgot password
router.put("/password/reset/:token", resetPasswordValidation.errors, resetPasswordValidation.validate, resetPassword);

//get user details
router.get("/profile", isAuthenticatedUser, getUserDetails);

//update user password
router.put("/password/update", isAuthenticatedUser, updatePasswordValidation.errors, updatePasswordValidation.validate, updatePassword);

//update user profile
router.put("/profile/update", isAuthenticatedUser, updateProfileValidation.errors, updateProfileValidation.validate, updateProfile);

//get all users -- admin
router.get("/admin/users", isAuthenticatedUser, isAuthenticatedRole("admin"), getAllUsers);

//get a particular users -- admin
router.get("/admin/user/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), getSingleUser);

//update user role -- admin
router.put("/admin/user/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), updateUserRoleValidation.errors, updateUserRoleValidation.validate, updateUserRole);

//delete user -- admin
router.delete("/admin/user/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteUser);

module.exports = router;