const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createPayment = async(req,res,next)=>{
    try {
        const paymentOrder = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "INR",
            metadata: {
                company: "myStore"
            },
            description: "myStore order payment"
        });

        return res.status(200).json({
            success: true,
            client_secret: paymentOrder.client_secret
        });
        
    } catch (error) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

const getStripeKey = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        key: process.env.STRIPE_API
    });
}

module.exports = { getStripeKey, createPayment };