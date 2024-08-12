const express = require('express');
const { getAllUser, deleteUser, getUserDetails, registerUser, loginUser, logOut, updatePassword, updateProfile, getSingleUser, updateUserRole } = require('../controller/user.controller');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
// Admin routes
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin") ,getAllUser);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin") ,getSingleUser).put(isAuthenticated, authorizeRoles("admin") ,updateUserRole).delete(isAuthenticated, authorizeRoles("admin") ,deleteUser);

module.exports = router;