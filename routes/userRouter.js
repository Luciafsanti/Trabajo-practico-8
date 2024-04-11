const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controllers");



router.route("/")
    .get(userController.getAllUsers)
    .post(/*userController.validateUser, userController.userValidationRules, */userController.createUser);

router.route("/:userId")
   .get(userController.getUserById)
   .put(userController.updateUser)
   .delete(userController.deleteUser);

module.exports = router;