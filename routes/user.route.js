// const express = require('express');
// const router = express.Router();
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);

router.get("/getUserById/:id", userController.getUserById);

router.get("/getUserByEmail/:email", userController.getUserByEmail);

router.post("/createUser", userController.createUser);

router.delete("/deleteUserByEmail/:email", userController.deleteUserByEmail);

router.delete("/deleteUserById/:id", userController.deleteUserById);

router.post("/addFriend/:id", userController.addFriend);

router.post("/removeFriend/:id", userController.removeFriend);

router.put("/updateAllUsers", userController.updateAllUsers);

module.exports = router;