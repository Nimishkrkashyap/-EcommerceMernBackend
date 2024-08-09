const User = require('../model/user.model')
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");

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

    const token = user.getJWTToken()

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
        token
    })
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

    const token = user.getJWTToken()

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token
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
// exports.getUserDetails = asyncHandler(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(new ErrorHandler("User not found", 404))
//     }

//     res.status(200).json({
//         success: true,
//         message: "User details fetched successfully",
//         user
//     })
// })

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