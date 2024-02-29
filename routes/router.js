const router = require("express").Router();

// curso router
const cursoRouter = require("./curso.js");
const userRouter = require("./users.js");
const authRouter = require("./auth.js");
const moduleRouter = require("./module.js");

router.use("/courses", cursoRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/course", moduleRouter);

module.exports = router;

