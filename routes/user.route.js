const express = require('express');
const { getAllUser, createUser, deleteUser, getUserDetails, updateUser } = require('../controller/user.controller');
const router = express.Router();

router.route("/users").get(getAllUser);
router.route("/users/new").get(createUser);
router.route("/users/:id").put(updateUser).delete(deleteUser).get(getUserDetails);

module.exports = router;