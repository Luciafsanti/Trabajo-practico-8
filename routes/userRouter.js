const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");



router.route("/")
    .get(userController.getUsers)
    .post(userController.validateUser, userController.userValidationRules, userController.createUser);

router.route("/:userId")
   .get(userController.userExists, userController.getUserById)
   .put(userController.userExists, userController.updateUser)
   .delete(userController.userExists, userController.deleteUser);

module.exports = router;