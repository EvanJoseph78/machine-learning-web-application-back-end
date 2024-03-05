const router = require("express").Router();

const verifyToken = require("../utils/verifyToken.js");

const userController = require("../controllers/userController");

//get all users
router.get("/", userController.getAllUsers);

//get all users
router.get("/user/get", verifyToken, userController.getLoggedUser);

//update user
router.put("/:id", verifyToken, userController.update);

//get user by id // desativar?
router.get("/:id", userController.getUserById);

//inscrever-se em um curso
router.put("/sub/course/:courseId", verifyToken, userController.subscribeCourse);

//retorna se o usuário está inscrito no curso
router.get("/sub/course/:courseId", verifyToken, userController.subscribedCourse);

//desinscrever-se em um curso
router.put("/unsub/course/:courseId", verifyToken, userController.unsubscribeCourse);

//curso finalizado
router.put("/course/:courseId/finished", verifyToken, userController.courseFinished);

//get subscribed courses
router.get("/sub/courses/", verifyToken, userController.getSubscribedCourses);

module.exports = router;

