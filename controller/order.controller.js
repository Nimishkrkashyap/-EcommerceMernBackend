const Order = require("../model/order.model")
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const ApiFeatures = require("../utils/apiFeatures");

// Controller for create order
exports.createOrder = asyncHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    // if (!(shippingInfo && orderItems && paymentInfo && itemsPrice && taxPrice && shippingPrice && totalPrice)){
    //     return next(new ErrorHandler("Plese enter all the fileds", 400))
    // }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order
    })
})

// Controller for my order
exports.myOrder = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        orders
    })
})

// Controller for get all order --Admin
exports.getAllOrder = asyncHandler(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        message: "All order fetched successfully",
        totalAmount,
        orders
    })
})

// Controller for get single order
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
    
})

// Controller for update order
exports.updateOrder = asyncHandler(async (req, res, next) => {
    
})

// Controller for delete order
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        order
    })
})