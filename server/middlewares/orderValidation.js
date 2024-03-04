const { body, validationResult } = require('express-validator');

//create product error validation
const createOrderValidation = {
    errors:
        [
            body('shippingInfo.address')
                .trim()
                .notEmpty().withMessage("Shipping address cannot be empty"),
            body('shippingInfo.city')
                .trim()
                .notEmpty().withMessage("Shipping city cannot be empty"),
            body('shippingInfo.state')
                .trim()
                .notEmpty().withMessage("Shipping state cannot be empty"),
            body('shippingInfo.country')
                .trim()
                .notEmpty().withMessage("Shipping country cannot be empty"),
            body('shippingInfo.pinCode')
                .trim()
                .notEmpty().withMessage("Shipping pinCode cannot be empty"),
            body('shippingInfo.phoneNo')
                .trim()
                .notEmpty().withMessage("Shipping phoneNo cannot be empty")
                .isNumeric({ min: 10, max: 10 }).withMessage("Shipping phoneNo invalid"),

            body('orderItems')
                .isArray({ min: 1 }).withMessage("OrderItems cannot be empty"),
            body('orderItems.*.name')
                .notEmpty().withMessage("OrderItem name cannot be empty"),
            body('orderItems.*.quantity')
                .notEmpty().withMessage("OrderItem quantity cannot be empty")
                .isInt({ min: 1 }).withMessage("OrderItem quantity must be an integer greater than 0"),
            body('orderItems.*.price')
                .notEmpty().withMessage("OrderItem price cannot be empty")
                .isFloat({ min: 1 }).withMessage("OrderItem price must be an integer greater than 0"),
            body('orderItems.*.image')
                .notEmpty().withMessage("OrderItem image cannot be empty"),
            body('orderItems.*.product')
                .notEmpty().withMessage("OrderItem product id cannot be empty")
                .isMongoId().withMessage("OrderItem product id invalid"),

            body('paymentInfo.id')
                .notEmpty().withMessage("Payment id cannot be empty"),
            body('paymentInfo.status')
                .notEmpty().withMessage("Payment status cannot be empty"),

            body('itemPrice')
                .notEmpty().withMessage("Item price cannot be empty")
                .isFloat({ min: 1 }).withMessage("Item price must be an integer greater than 0"),

            body('taxPrice')
                .notEmpty().withMessage("Tax price cannot be empty")
                .isFloat({ min: 1 }).withMessage("Tax price must be an integer greater than 0"),

            body('shippingPrice')
                .notEmpty().withMessage("Shipping price cannot be empty")
                .isFloat({ min: 0 }).withMessage("Shipping price must be positive"),

            body('totalPrice')
                .notEmpty().withMessage("Shipping price cannot be empty")
                .isFloat({ min: 1 }).withMessage("Shipping price must be an integer greater than 0"),
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

module.exports = { createOrderValidation };