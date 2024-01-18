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
                return res.status(400).json({ success: false, message: errors });
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
                return res.status(400).json({ success: false, message: errors });
            }
            next();
        }
}

module.exports = { createUserValidation, loginUserValidation }