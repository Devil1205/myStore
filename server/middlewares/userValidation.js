const { body, validationResult } = require('express-validator');

//create user error validation
const createUserValidation = {
    errors:
        [
            body('name')
                .trim()
                .notEmpty().withMessage("Name cannot be empty")
                .isLength({ max: 30, min: 4 }).withMessage("Name must be between 4 to 30 characters only"),

            body('email')
                .trim()
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid Email"),

            body('password')
                .trim()
                .notEmpty().withMessage("Password cannot be empty")
                .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters"),

            body('avatar.public_id')
                .trim()
                .notEmpty().withMessage("Avatar public id cannot be empty"),
            body('avatar.url')
                .trim()
                .notEmpty().withMessage("Avatar url cannot be empty")
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.errors[0].msg });
            }
            next();
        }
}

//login user error validation
const loginUserValidation = {
    errors:
        [
            body('email')
                .trim()
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid Email"),

            body('password')
                .trim()
                .notEmpty().withMessage("Password cannot be empty")
                .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.errors[0].msg });
            }
            next();
        }
}

//forgot password validation
const forgotPasswordValidation = {
    errors:
        [
            body('email')
                .trim()
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid Email"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }
}

//reset password validation
const resetPasswordValidation = {
    errors:
        [
            body('password')
                .trim()
                .notEmpty().withMessage("Password cannot be empty")
                .isLength({ min: 6 }).withMessage("Password must be atleast 6 characters"),
            body('confirmPassword')
                .trim()
                .notEmpty().withMessage("Confirm password cannot be empty")
                .isLength({ min: 6 }).withMessage("Confirm password must be atleast 6 characters"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }

}
//update password validation
const updatePasswordValidation = {
    errors:
        [
            body('oldPassword')
                .trim()
                .notEmpty().withMessage("Old password cannot be empty")
                .isLength({ min: 6 }).withMessage("Old password must be atleast 6 characters"),
            body('newPassword')
                .trim()
                .notEmpty().withMessage("New password cannot be empty")
                .isLength({ min: 6 }).withMessage("New password must be atleast 6 characters"),
            body('confirmPassword')
                .trim()
                .notEmpty().withMessage("Confirm password cannot be empty")
                .isLength({ min: 6 }).withMessage("Confirm password must be atleast 6 characters"),
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }
}

//update profile validation
const updateProfileValidation = {
    errors:
        [
            body('name')
                .trim()
                .notEmpty().withMessage("Name cannot be empty")
                .isLength({ max: 30, min: 4 }).withMessage("Name must be between 4 to 30 characters only"),

            body('avatar.public_id')
                .trim()
                .notEmpty().withMessage("Avatar public id cannot be empty"),

            body('avatar.url')
                .trim()
                .notEmpty().withMessage("Avatar url cannot be empty")
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }
}

//update user role validation
const updateUserRoleValidation = {
    errors:
        [
            body('name')
                .trim()
                .notEmpty().withMessage("Name cannot be empty")
                .isLength({ max: 30, min: 4 }).withMessage("Name must be between 4 to 30 characters only"),

                body('email')
                .trim()
                .notEmpty().withMessage("Email cannot be empty")
                .isEmail().withMessage("Invalid Email"),

                body('role')
                .trim()
                .notEmpty().withMessage("Role cannot be empty")
        ],
    validate:
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }
}

module.exports = { createUserValidation, loginUserValidation, forgotPasswordValidation, resetPasswordValidation, updatePasswordValidation, updateProfileValidation, updateUserRoleValidation }