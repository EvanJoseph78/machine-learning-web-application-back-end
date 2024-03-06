const router = require("express").Router();

const authController = require("../controllers/authController")


// CREATE USER

router.post("/signup", authController.signup);

// SIGN IN 

router.post("/signin", authController.signin);

// LOGOUT

router.post("/logout", authController.logout);

module.exports = router;
