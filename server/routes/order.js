const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, isAuthenticatedRole } = require('../middlewares/auth');
const { createOrder, getSingleOrder, getLoggedInOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { createOrderValidation } = require('../middlewares/orderValidation');

//create new order
router.post("/order/new", isAuthenticatedUser, createOrderValidation.errors, createOrderValidation.validate, createOrder);

//get single order -- admin
router.get("/admin/order/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), getSingleOrder);

//get logged-in user orders
router.get("/profile/orders", isAuthenticatedUser, getLoggedInOrders);

//get all users orders -- admin
router.get("/admin/orders", isAuthenticatedUser, isAuthenticatedRole("admin"), getAllOrders);

//update order -- admin
router.put("/admin/order/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), updateOrder);

//delete order -- admin
router.delete("/admin/order/:id", isAuthenticatedUser, isAuthenticatedRole("admin"), deleteOrder);

module.exports = router;