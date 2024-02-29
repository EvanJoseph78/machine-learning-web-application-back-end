const router = require("express").Router();

const verifyToken = require("../utils/verifyToken.js");

const userController = require("../controllers/userController");

//get all users
router.get("/", userController.getAllUsers);

//update user
router.put("/:id", verifyToken, userController.update);

module.exports = router;

