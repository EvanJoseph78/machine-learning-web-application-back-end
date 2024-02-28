const express = require("express");
const { signin, signup } = require("../controllers/auth.js");

const router = express.Router();

// CREATE USER

router.post("/signup", signup)

// SIGN IN 

router.post("/signin", signin)

// GOOGLE AUTH

router.post("/google")

module.exports = router;
