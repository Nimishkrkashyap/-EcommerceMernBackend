const User = require('../model/user.model')
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const sendToken = require('../utils/jwtToken');

// Register a User
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "Smaple url",
            url: "profilepicurl"
        }
    })

    sendToken(user, 201, res)
})

exports.loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})

// Logout user

exports.logOut = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})


// // Controller for get all user
// exports.getAllUser = asyncHandler(async (req, res) => {
//     const user = await User.find();

//     res.status(201).json({
//         success: true,
//         message: "User fetched successfully",
//         user
//     });
// })

// // Controller for get single user
exports.getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        user
    })
})

// // Controller for updating existing user
// exports.updateUser = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(new ErrorHandler("User not found", 404))
//     }

//     res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         user
//     })
// })

// // Controller for deleting existing user
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(new ErrorHandler("User not found", 404))
//     }

//     res.status(200).json({
//         success: true,
//         message: "User deleted successfully",
//         user
//     })
// })

// Update user password
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)
})