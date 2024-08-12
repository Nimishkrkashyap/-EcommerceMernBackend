const User = require('../model/user.model')
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middleware/asyncHandler");
const sendToken = require('../utils/jwtToken');

// Register User
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

// Login user
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

// Controller for update profile
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    })

})

// Controller for get all user - (Admin)
exports.getAllUser = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        message: "All users fetched succesfully",
        users
    })
})

// Controller for get single user - (Admin)
exports.getSingleUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    
    if (!user) {
        return next(new ErrorHandler("User does not exist", 400))
    }

    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user
    })
})

// Controller for for update user role - (Admin)
exports.updateUserRole = asyncHandler(async (req, res, next) => {
    const userData = {
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, userData,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Role updated successfully",
        user
    })
})

// Controller for for delete user - (Admin)
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 400))
    }
    const deletedUser =  await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        deletedUser
    })
})

