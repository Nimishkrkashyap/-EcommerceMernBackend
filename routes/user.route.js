const express = require('express');
const { getAllUser, deleteUser, getUserDetails, updateUser, registerUser, loginUser, logOut, updatePassword } = require('../controller/user.controller');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logOut)
router.route("/me").get(isAuthenticated, getUserDetails)
router.route("/password/update").put(isAuthenticated, updatePassword)
// router.route("/users").get(getAllUser);
// router.route("/users/new").get(createUser);
// router.route("/users/:id").put(updateUser).delete(deleteUser).get(getUserDetails);

module.exports = router;