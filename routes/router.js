const router = require("express").Router();

// curso router
const cursoRouter = require("./curso.js");
const userRouter = require("./users.js");
const authRouter = require("./auth.js");

router.use("/courses", cursoRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;

