const { body, validationResult } = require('express-validator');

//create product error validation
const createProductValidation = {
    errors:
        [
            body('name')
                .trim()
                .notEmpty().withMessage("Name cannot be empty"),

            body('description')
                .trim()
                .notEmpty().withMessage("Description cannot be empty"),

            body('price')
                .trim()
                .notEmpty().withMessage("Price cannot be empty")
                .isFloat({ min: 1 }).withMessage("Price must be a number greater than 0"),

            body('images')
                .notEmpty().withMessage("Images cannot be empty")
                .isArray({ min: 1 }).withMessage("Atleast one image is required"),

            body('category')
                .trim()
                .notEmpty().withMessage("Category cannot be empty"),
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

//create review error validation
const createReviewValidation = {
    errors:
        [
            body('rating')
                .trim()
                .notEmpty().withMessage("Rating cannot be empty")
                .isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5 both inclusive"),

            body('comment')
                .trim()
                .notEmpty().withMessage("Comment cannot be empty"),
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

module.exports = { createProductValidation, createReviewValidation }