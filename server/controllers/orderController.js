const Order = require('../models/orderSchema');
const Product = require('../models/productSchema');

//create new order
const createOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        const order = new Order({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user.id,
            paidAt: Date.now()
        });

        await order.save();

        return res.status(201).json({ sucess: true, order });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get a single order -- admin
const getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order)
            return next({ status: 404, message: "This order does not exist" });
        return res.status(200).json({ success: true, order });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get logged in user orders
const getLoggedInOrders = async (req, res, next) => {
    try {
        const order = await Order.find({ user: req.user.id });
        return res.status(200).json({ success: true, order });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//get all users orders -- admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        })
        return res.status(200).json({ success: true, orders, totalAmount });
    }
    catch (e) {
        return next({ status: 500, message: "Internal Server Error" });
    }
}

//update order -- admin
const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order)
            return next({ status: 404, message: "This order does not exist" });

        if (order.orderStatus === "Delivered")
            return next({ status: 404, message: "This order has already been delivered" });

        //update is product stock quantity
        order.orderItems.forEach(async (item) => {
            await updateProductStock(item.product, item.quantity);
        });

        const { orderStatus } = req.body;
        if (orderStatus === "Delivered")
            order.deliveredAt = Date.now();
        order.orderStatus = orderStatus;
        await order.save();

        return res.status(200).json({ success: true, order });
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}

const updateProductStock = async (productId, quantity) => {
    const product = await Product.findById(productId);
    product.stock -= quantity;
    await product.save();
}

//delete order -- admin
const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order)
            return next({ status: 404, message: "This order does not exist" });

        return res.status(200).json({ success: true, message: "Order deleted successfully" });
    }
    catch (e) {
        console.log(e);
        return next({ status: 500, message: "Internal Server Error" });
    }
}


module.exports = { createOrder, getSingleOrder, getLoggedInOrders, getAllOrders, updateOrder, deleteOrder };