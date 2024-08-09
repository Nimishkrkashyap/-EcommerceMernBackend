const express = require('express');
const { getAllUser, createUser, deleteUser, getUserDetails, updateUser, registerUser, loginUser } = require('../controller/user.controller');
const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/users").get(getAllUser);
// router.route("/users/new").get(createUser);
// router.route("/users/:id").put(updateUser).delete(deleteUser).get(getUserDetails);

module.exports = router;