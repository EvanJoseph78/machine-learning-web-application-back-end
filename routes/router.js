const router = require("express").Router();

// curso router
const cursoRouter = require("./curso.js");
const userRouter = require("./users.js");

router.use("/courses", cursoRouter);
router.use("/users", userRouter);

module.exports = router;

