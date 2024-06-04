const router = require("express").Router();

// curso router
const cursoRouter = require("./curso.js");
const userRouter = require("./users.js");
const authRouter = require("./auth.js");
const moduleRouter = require("./module.js");
const questionRouter = require("./question.js");
const classRouter = require("./class.js");
const categoryRouter = require("./category.js");

router.use("/courses", cursoRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/course", moduleRouter);
router.use("/course", questionRouter);
router.use("/course", classRouter);
router.use("/categories", categoryRouter);

module.exports = router;

