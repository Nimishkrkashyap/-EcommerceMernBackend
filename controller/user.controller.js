const User = require('../model/user.model')
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const { use } = require('../routes/product.route');

// Controller for creating new user
exports.createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    });
})

// Controller for get all user
exports.getAllUser = asyncHandler(async (req, res) => {
    const user = await User.find();

    res.status(201).json({
        success: true,
        message: "User fetched successfully",
        user
    });
})

// Controller for get single user
exports.getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        user
    })
})

// Controller for updating existing user
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    })
})

// Controller for deleting existing user
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    })
})